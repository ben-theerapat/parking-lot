import { Test, TestingModule } from '@nestjs/testing';
import { Ticket } from 'src/ticket/schemas/ticket.schema';
import { ticketStub } from '../../ticket/test/stubs/ticket.stub';
import { CarController } from '../car.controller';
import { CarService } from '../car.service';
import { CarParkDto } from '../dto/car.dto';
import { carStub } from './stubs/car.stub';

jest.mock('../car.service');

describe('CarController', () => {
  let carController: CarController;
  let carService: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [CarService],
    }).compile();

    carController = module.get<CarController>(CarController);
    carService = module.get<CarService>(CarService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(carController).toBeDefined();
  });

  describe('park', () => {
    describe('when park is called', () => {
      let ticket: Ticket;
      let carPark: CarParkDto;

      beforeEach(async () => {
        carPark = {
          plateNumber: carStub().plateNumber,
          carSize: carStub().carSize,
        };
        ticket = await carController.park(carPark);
      });

      test('then it should call park service', () => {
        expect(carService.park).toHaveBeenCalled();
      });

      test('then it should return ticket detail', () => {
        expect(ticket).toEqual(ticketStub());
      });
    });
  });
});
