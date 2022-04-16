import mongoose from 'mongoose';
import { CarSize } from '../../shared/car-size.type';

export class TicketDto {
  parkingLotId: mongoose.Schema.Types.ObjectId;
  slotId: number;
  plateNumber: string;
  carSize: CarSize;
  exitAt?: Date;
}
