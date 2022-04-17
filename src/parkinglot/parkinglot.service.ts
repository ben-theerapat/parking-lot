import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Parkinglot, ParkinglotDocument } from './shemas/parkinglot.schema';
import { Model } from 'mongoose';
import { CreateParkinglotDto, ParkinglotDto, Slot } from './dto/parkinglot.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ParkinglotService {
  constructor(
    @InjectModel(Parkinglot.name)
    private readonly model: Model<ParkinglotDocument>,
  ) {}

  async createParkingLot(parkingLot: CreateParkinglotDto): Promise<Parkinglot> {
    const { rank, name, slots } = parkingLot;

    const {
      smalls: smallSlotAmount,
      mediums: mediumSlotAmount,
      larges: largeSlotAmount,
    } = slots;

    const smallSlots: Slot[] = Array(smallSlotAmount)
      .fill(null)
      .map(() => {
        return {
          slotId: uuidv4(),
          isAvailable: true,
        };
      });

    const mediumSlots: Slot[] = Array(mediumSlotAmount)
      .fill(null)
      .map(() => {
        return {
          slotId: uuidv4(),
          isAvailable: true,
        };
      });

    const largeSlots: Slot[] = Array(largeSlotAmount)
      .fill(null)
      .map(() => {
        return {
          slotId: uuidv4(),
          isAvailable: true,
        };
      });

    const parkinglotDetail: ParkinglotDto = {
      rank: rank,
      name: name,
      slots: {
        smalls: smallSlots,
        mediums: mediumSlots,
        larges: largeSlots,
      },
    };

    const created = await this.model.create(parkinglotDetail);
    const parkinglot = await this.model.findOne({ _id: created._id }).exec();
    return parkinglot;
  }

  async getStatus(): Promise<Parkinglot[]> {
    const parkingLotDetails: Parkinglot[] = await this.model.find({}).exec();
    const _parkingLotDetails = JSON.parse(JSON.stringify(parkingLotDetails));

    const parkingLotWithAvilableSlots = _parkingLotDetails.map((item) => {
      const smalls = item.slots?.smalls?.filter((item) => item.isAvailable);
      const mediums = item.slots?.mediums?.filter((item) => item.isAvailable);
      const larges = item.slots?.larges?.filter((item) => item.isAvailable);
      return {
        ...item,
        slots: {
          smalls,
          mediums,
          larges,
        },
      };
    });
    return parkingLotWithAvilableSlots;
  }
}
