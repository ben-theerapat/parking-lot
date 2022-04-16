import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { CarModule } from './car/car.module'
import { ParkinglotModule } from './parkinglot/parkinglot.module'
import { TicketModule } from './ticket/ticket.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ParkinglotModule,
    TicketModule,
    CarModule,
  ],
})

export class AppModule {}
