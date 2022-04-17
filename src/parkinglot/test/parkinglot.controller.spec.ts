import { Test, TestingModule } from '@nestjs/testing';
import { CreateParkinglotDto } from '../dto/parkinglot.dto';
import { ParkinglotController } from '../parkinglot.controller';
import { ParkinglotService } from '../parkinglot.service';
import { Parkinglot } from '../shemas/parkinglot.schema';
import { createParkinglotStub, parkinglotStub } from './stubs/parkinglot.stub';

jest.mock('../parkinglot.service');

describe('ParkinglotController', () => {
  let parkinglotController: ParkinglotController;
  let parkinglotService: ParkinglotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkinglotController],
      providers: [ParkinglotService],
    }).compile();

    parkinglotController =
      module.get<ParkinglotController>(ParkinglotController);
    parkinglotService = module.get<ParkinglotService>(ParkinglotService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(parkinglotController).toBeDefined();
  });

  describe('createParkinglot', () => {
    describe('when createParkinglot is called', () => {
      let parkingLot: Parkinglot;
      let createparkinglot: CreateParkinglotDto;

      beforeEach(async () => {
        createparkinglot = {
          name: createParkinglotStub().name,
          rank: createParkinglotStub().rank,
          slots: {
            smalls: createParkinglotStub().slots.smalls,
            mediums: createParkinglotStub().slots.mediums,
            larges: createParkinglotStub().slots.larges,
          },
        };
        parkingLot = await parkinglotController.createParkingLot(
          createparkinglot,
        );
      });

      test('then it should call parkinglotService.createParkingLot', () => {
        expect(parkinglotService.createParkingLot).toHaveBeenCalled();
      });

      test('then it should return parking detail', () => {
        expect(parkingLot).toEqual(parkinglotStub());
      });
    });
  });
});
