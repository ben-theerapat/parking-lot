import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketDocument, Ticket } from '../ticket/schemas/ticket.schema';
import {
  ParkinglotDocument,
  Parkinglot,
} from '../parkinglot/shemas/parkinglot.schema';
import { CarExitDto, CarParkDto } from './dto/car.dto';
import { ParkinglotDto } from 'src/parkinglot/dto/parkinglot.dto';
import { TicketDto } from 'src/ticket/dto/ticket.dto';
import mongoose from 'mongoose';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Parkinglot.name)
    private readonly parkinglotModel: Model<ParkinglotDocument>,
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async park(carPark: CarParkDto): Promise<Ticket> {
    const { plateNumber, carSize } = carPark;
    const parkingLots = await this.parkinglotModel.find({}).exec();
    const slotKey = `${carSize}s`;

    let ticket: TicketDto;
    let newParkingLot: ParkinglotDto;
    const hasSlot = parkingLots.some((parkingLot) => {
      const availableSlot = parkingLot?.slots[slotKey]?.find(
        (item) => item.isAvailable === true,
      );
      if (availableSlot) {
        const availableSlotIndex = parkingLot.slots[slotKey]?.findIndex(
          (item) => item.isAvailable === true,
        );
        newParkingLot = JSON.parse(JSON.stringify(parkingLot));
        newParkingLot.slots[slotKey][availableSlotIndex].isAvailable = false;
        ticket = {
          parkingLotId: parkingLot._id,
          slotId: availableSlot.slotId,
          plateNumber,
          carSize,
        };
        return true;
      } else {
        return false;
      }
    });

    if (!hasSlot) throw new BadRequestException('slot not found');

    const findCondition = {
      _id: newParkingLot._id,
    };
    await this.parkinglotModel
      .findOneAndUpdate(findCondition, newParkingLot)
      .exec();
    const created = await this.ticketModel.create(ticket);

    const result = await this.ticketModel.findOne({ _id: created._id }).exec();
    return result;
  }

  async exit(carExit: CarExitDto): Promise<Ticket> {
    const { ticketId } = carExit;
    const _id = new mongoose.Types.ObjectId(String(ticketId));
    const updated = await this.ticketModel
      .findOneAndUpdate({ _id }, { exitAt: new Date() })
      .exec();
    if (!updated) throw new NotFoundException('ticket not found');
    const { parkingLotId, carSize, slotId } = updated;
    const parkingLotDetail: Parkinglot = await this.parkinglotModel
      .findOne({
        _id: parkingLotId,
      })
      .exec();
    const slotKey = `${carSize}s`;

    const slotIndex = parkingLotDetail.slots[slotKey].findIndex(
      (s) => s.slotId === slotId,
    );
    const newParkingLotDetail: Parkinglot = JSON.parse(
      JSON.stringify(parkingLotDetail),
    );
    newParkingLotDetail.slots[slotKey][slotIndex].isAvailable = true;

    const findCondition = {
      _id: parkingLotId,
    };
    await this.parkinglotModel.findOneAndUpdate(
      findCondition,
      newParkingLotDetail,
    );

    const result = await this.ticketModel.findOne({ _id: ticketId }).exec();
    return result;
  }
}
