import { CarSize } from '../../shared/car-size.type'
import { CarSizeEnum } from 'src/shared/car-size.enum'
import mongoose from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export class CarParkDto {
  @ApiProperty({ default: 'abc-1234' })
  plateNumber: string

  @ApiProperty({ enum: CarSizeEnum })
  carSize: CarSize
}

export class CarExitDto {
  @ApiProperty({ default: '625902e01060de7232d53424' })
  ticketId: mongoose.Schema.Types.ObjectId
}
