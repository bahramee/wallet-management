import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
  @Prop({})
  balance: number;

  @Prop({})
  userId: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
