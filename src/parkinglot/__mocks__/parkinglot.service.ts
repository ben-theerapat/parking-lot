import { parkinglotStub } from '../test/stubs/parkinglot.stub';

export const ParkinglotService = jest.fn().mockReturnValue({
  createParkingLot: jest.fn().mockResolvedValue(parkinglotStub()),
  getStatus: jest.fn().mockResolvedValue(parkinglotStub()),
});
