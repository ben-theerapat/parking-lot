import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { ParkinglotModule } from './parkinglot/parkinglot.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URI), ParkinglotModule],
})
export class AppModule {}
