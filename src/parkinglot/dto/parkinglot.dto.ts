import mongoose from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
export interface Slot {
  slotId: string,
  isAvailable: boolean
}

export class ParkinglotDto {
  _id?: mongoose.Schema.Types.ObjectId
  rank: number
  name: string
  slots: {
    smalls: Slot[]
    mediums: Slot[]
    larges: Slot[] 
  }
}

class SlotDto {
  @ApiProperty({ default: 1 })
  smalls: number

  @ApiProperty({ default: 2 })
  mediums: number

  @ApiProperty({ default: 3 })
  larges: number
}

export class CreateParkinglotDto {
  @ApiProperty({ default: 'parkinglot_02' })
  name: string

  @ApiProperty({ default: 2 })
  rank: number

  @ApiProperty()
  slots!: SlotDto
}
