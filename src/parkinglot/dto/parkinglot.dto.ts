import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
export interface Slot {
  slotId: string;
  isAvailable: boolean;
}

export class ParkinglotDto {
  _id?: mongoose.Schema.Types.ObjectId;
  rank: number;
  name: string;
  slots: {
    smalls: Slot[];
    mediums: Slot[];
    larges: Slot[];
  };
}

class SlotDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 1 })
  smalls: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 2 })
  mediums: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 3 })
  larges: number;
}

export class CreateParkinglotDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'parkinglot_02' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 2 })
  rank: number;

  @ValidateNested()
  @Type(() => SlotDto)
  @ApiProperty()
  slots!: SlotDto;
}
