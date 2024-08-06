import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class DepositWalletDto {
  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ default: 1000 })
  @IsNotEmpty()
  amount: number;

}