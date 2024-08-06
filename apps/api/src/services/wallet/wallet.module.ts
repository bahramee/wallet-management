import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { DailyTotal, DailyTotalSchema } from './schemas/dailytotal.schema';

const mongoUrl = process.env.NODE_ENV === 'test' 
  ? 'mongodb://localhost:27017/test_wallet' 
  : 'mongodb://mongo:27017/wallet';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigurationModule,
    MongooseModule.forRoot(mongoUrl),
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    MongooseModule.forFeature([{ name: DailyTotal.name, schema: DailyTotalSchema }]),
    // PassportModule,
  ],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
