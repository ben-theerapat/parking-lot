import { CarSize } from '../../shared/car-size.type';
import { CarSizeEnum } from '../../shared/car-size.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';

function toMongoObjectId({ value, key }): Types.ObjectId {
  if (
    Types.ObjectId.isValid(value) &&
    new Types.ObjectId(value).toString() === value
  ) {
    return new Types.ObjectId(value);
  } else {
    throw new BadRequestException(`${key} is not a valid MongoId`);
  }
}

export class CarParkDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'abc-1234' })
  plateNumber: string;

  @IsNotEmpty()
  @IsEnum(CarSizeEnum)
  @ApiProperty({ enum: CarSizeEnum })
  carSize: CarSize;
}

export class CarExitDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  @ApiProperty({ default: '625902e01060de7232d53424' })
  ticketId: Types.ObjectId;
}
