import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepositWalletDto } from './dto/deposit-wallet.dto';
import { Wallet } from './schemas/wallet.schema';
import { v4 as uuidv4 } from 'uuid';
import { GetWalletDto } from './dto/get-wallet.dto';
import { Transaction } from './schemas/transaction.schema';
import { DailyTotal } from './schemas/dailytotal.schema';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<Wallet>,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    @InjectModel(DailyTotal.name)
    private readonly dailyTotalModel: Model<DailyTotal>,
  ) { }

  async depositWallet(depositWalletDto: DepositWalletDto): Promise<{ reference_id: string }> {
    const { userId, amount } = depositWalletDto;
    let wallet = await this.walletModel.findOne({ userId }).exec();

    if (!wallet) {
      // Create a new wallet if none exists
      wallet = new this.walletModel({ userId, balance: amount });
    } else {
      // Deposit money into existing wallet
      wallet.balance += amount;
    }
    await wallet.save();
    const refrenceId = uuidv4();
    const transaction = new this.transactionModel({ refrenceId, userId, amount, type: 'deposit' })
    await transaction.save()
    return { reference_id: refrenceId };
  }

  async getWallet(userId: number): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({ userId }).exec();

    if (!wallet) {
      throw new NotFoundException('Wallet not found.');
    }

    return wallet;
  }

  async calculateDailyTotals(): Promise<number> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const transactions = await this.transactionModel.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).exec();

    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    return totalAmount;
  }

  async logDailyTotals(): Promise<void> {
    const totalAmount = await this.calculateDailyTotals();
    const dailyTotal = new this.dailyTotalModel({
      date: new Date(),
      totalAmount,
    });
    await dailyTotal.save();
    console.log(`Total transactions amount for today: ${totalAmount}`);
  }
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.logDailyTotals();
  }
}
