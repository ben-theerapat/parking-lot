import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Parkinglot,
  ParkinglotSchema,
} from '../parkinglot/shemas/parkinglot.schema';
import { Ticket, TicketSchema } from '../ticket/schemas/ticket.schema';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [
    MongooseModule.forFeature([
      { name: Parkinglot.name, schema: ParkinglotSchema },
      { name: Ticket.name, schema: TicketSchema },
    ]),
  ],
})
export class CarModule {}
