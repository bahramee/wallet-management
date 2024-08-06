import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DailyTotal extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  totalAmount: number;
}

export const DailyTotalSchema = SchemaFactory.createForClass(DailyTotal);