import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ParkinglotService } from './parkinglot.service';
import { CreateParkinglotDto } from './dto/parkinglot.dto';
import { Parkinglot } from './shemas/parkinglot.schema';

@Controller('parkinglot')
export class ParkinglotController {
  constructor(private readonly parkinglotService: ParkinglotService) {}

  @Post('create')
  @HttpCode(201)
  async createParkingLot(
    @Body() parkingLot: CreateParkinglotDto,
  ): Promise<Parkinglot> {
    return await this.parkinglotService.createParkingLot(parkingLot);
  }

  @Get('status')
  async getStatus(): Promise<Parkinglot[]> {
    return await this.parkinglotService.getStatus();
  }
}
