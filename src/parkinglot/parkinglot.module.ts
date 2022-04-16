import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkinglotController } from './parkinglot.controller';
import { ParkinglotService } from './parkinglot.service';
import { Parkinglot, ParkinglotSchema } from './shemas/parkinglot.schema';

@Module({
  controllers: [ParkinglotController],
  providers: [ParkinglotService],
  imports: [
    MongooseModule.forFeature([
      { name: Parkinglot.name, schema: ParkinglotSchema },
    ]),
  ],
})
export class ParkinglotModule {}
