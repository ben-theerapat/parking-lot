import { Body, Controller, Post } from '@nestjs/common';
import { Ticket } from '../ticket/schemas/ticket.schema';
import { CarService } from './car.service';
import { CarExitDto, CarParkDto } from './dto/car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('park')
  async park(@Body() carPark: CarParkDto): Promise<Ticket> {
    return await this.carService.park(carPark);
  }

  @Post('exit')
  async exit(@Body() carExit: CarExitDto): Promise<Ticket> {
    return await this.carService.exit(carExit);
  }
}
