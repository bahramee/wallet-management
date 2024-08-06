import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetWalletDto {
  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  userId: number;
}