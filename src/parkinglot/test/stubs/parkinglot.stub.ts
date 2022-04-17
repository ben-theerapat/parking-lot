import mongoose from 'mongoose';
import { CreateParkinglotDto } from 'src/parkinglot/dto/parkinglot.dto';

export const parkinglotStub = () => {
  return {
    _id: new mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    name: 'parking_lot_test',
    rank: 19,
    slots: {
      smalls: [
        {
          slotId: '90bc19ac-bc97-11ec-8422-0242ac120002',
          isAvailable: true,
        },
      ],
      mediums: [
        {
          slotId: '90bc1c90-bc97-11ec-8422-0242ac120002',
          isAvailable: true,
        },
        {
          slotId: '90bc2064-bc97-11ec-8422-0242ac120002',
          isAvailable: true,
        },
      ],
      larges: [
        {
          slotId: '6025433e-77db-41cf-87fc-3f1f5a9cf8cc',
          isAvailable: true,
        },
        {
          slotId: '90bc2546-bc97-11ec-8422-0242ac120002',
          isAvailable: true,
        },
        {
          slotId: '90bc2712-bc97-11ec-8422-0242ac120002',
          isAvailable: true,
        },
      ],
    },
  };
};

export const createParkinglotStub = (): CreateParkinglotDto => {
  return {
    name: 'parking_lot_test',
    rank: 20,
    slots: {
      smalls: 1,
      mediums: 2,
      larges: 3,
    },
  };
};
