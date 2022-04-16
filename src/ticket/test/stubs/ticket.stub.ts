import mongoose from 'mongoose';

export const ticketStub = () => {
  return {
    parkingLotId: new mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    slotId: '6025433e-77db-41cf-87fc-3f1f5a9cf8cc',
    plateNumber: 'dsdf-221',
    carSize: 'large',
    exitAt: new Date('2022-04-14T13:00:26.388Z'),
  };
};
