import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DepositWalletDto } from './dto/deposit-wallet.dto';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern('deposit_wallet')
  depositWallet(@Payload() depositWalletDto: DepositWalletDto) {
    return this.walletService.depositWallet(depositWalletDto);
  }

  @MessagePattern('get_wallet')
  getWallet(@Payload() userId: number) {
    return this.walletService.getWallet(userId);
  }
}
