import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ParkinglotDocument = Parkinglot & mongoose.Document;

class Slot {
  @Prop({ required: true })
  slotId: string;

  @Prop({ default: true })
  isAvilable: boolean;
}

@Schema()
class SlotType {
  @Prop({ required: true })
  smalls: Slot[];

  @Prop({ required: true })
  mediums: Slot[];

  @Prop({ required: true })
  larges: Slot[];
}

@Schema()
export class Parkinglot {
  _id?: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  rank: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slots: SlotType;
}

export const ParkinglotSchema = SchemaFactory.createForClass(Parkinglot);
