import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from './car/car.module';
import { ParkinglotModule } from './parkinglot/parkinglot.module';
import { TicketModule } from './ticket/ticket.module';

const mongoUri: string =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/parkinglot';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(mongoUri),
    ParkinglotModule,
    TicketModule,
    CarModule,
  ],
})
export class AppModule {}
