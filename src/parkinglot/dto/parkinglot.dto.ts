import mongoose from 'mongoose'

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
  smalls: number
  mediums: number
  larges: number
}

export class CreateParkinglotDto {
  name: string
  rank: number
  slots!: SlotDto
}
