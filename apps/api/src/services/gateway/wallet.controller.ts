import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DepositWalletDto } from '../wallet/dto/deposit-wallet.dto';

import { WALLET_SERVICE } from './constants';
import { ResponseInterceptor } from './response-interceptor';

@ApiTags('Wallet')
@Controller('wallet')
@UseInterceptors(ResponseInterceptor)
export class WalletController {
  constructor(
    @Inject(WALLET_SERVICE)
    private readonly walletServiceClientProxy: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('money')
  @ApiOperation({
    summary: 'Enter your wallet with user_id and amount.',
  })
  @ApiBody({ type: DepositWalletDto })
  @ApiResponse({
    status: 200,
    description: 'The succeed deposit to wallet.',
    type: DepositWalletDto,
  })
  depositWallet(@Body() depositWalletDto: DepositWalletDto) {
    try {
      return this.walletServiceClientProxy.send('deposit_wallet', depositWalletDto);
    } catch (error) {
      console.log('error on deposit wallet', error);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('balance/:userId')
  @ApiOperation({ summary: 'get wallet of user' })
  @ApiResponse({
    status: 200,
    description: 'The succeed get wallet',
  })
  getWallet(@Param('userId') userId: number) {
    return this.walletServiceClientProxy.send('get_wallet', userId);
  }
}
