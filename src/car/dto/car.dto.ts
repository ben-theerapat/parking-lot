import { CarSize } from '../../shared/car-size.type'
import mongoose from 'mongoose'
export class CarParkDto {
  plateNumber: string
  carSize: CarSize
}

export class CarExitDto {
  ticketId: mongoose.Schema.Types.ObjectId
}
