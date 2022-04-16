import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { CarSize } from '../../shared/car-size.type';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop()
  parkingLotId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  slotId: string;

  @Prop({ required: true })
  plateNumber: string;

  @Prop({ required: true, enum: ['small', 'medium', 'large'] })
  carSize: CarSize;

  @Prop()
  exitAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
