import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from '../car.service';
import { getModelToken } from '@nestjs/mongoose';
import { ticketStub } from '../../ticket/test/stubs/ticket.stub';
import { parkinglotStub } from '../..//parkinglot/test/stubs/parkinglot.stub';
import { ParkinglotDocument } from 'src/parkinglot/shemas/parkinglot.schema';
import { Model } from 'mongoose';
import { TicketDocument } from 'src/ticket/schemas/ticket.schema';

describe('CarService', () => {
  let service: CarService;
  let parkinglotModel: Model<ParkinglotDocument>;
  let ticketModel: Model<TicketDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: getModelToken('Parkinglot'),
          useValue: {
            constructor: jest.fn().mockResolvedValue(parkinglotStub()),
            find: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getModelToken('Ticket'),
          useValue: {
            constructor: jest.fn().mockResolvedValue(ticketStub()),
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    parkinglotModel = module.get<Model<ParkinglotDocument>>(
      getModelToken('Parkinglot'),
    );
    ticketModel = module.get<Model<TicketDocument>>(getModelToken('Ticket'));
    service = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('park should return ticket', async () => {
    jest.spyOn(parkinglotModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([parkinglotStub()]),
    } as any);
    jest.spyOn(parkinglotModel, 'findOneAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(parkinglotStub()),
    } as any);
    jest.spyOn(ticketModel, 'create').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(ticketStub()),
    } as any);
    jest.spyOn(ticketModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(ticketStub()),
    } as any);

    const tickets = await service.park({
      plateNumber: 'dsdf-221',
      carSize: 'large',
    });
    expect(tickets).toEqual(ticketStub());
  });

  it('exit should return ticket', async () => {
    jest.spyOn(ticketModel, 'findOneAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(ticketStub()),
    } as any);
    jest.spyOn(parkinglotModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(parkinglotStub()),
    } as any);
    jest.spyOn(parkinglotModel, 'findOneAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(ticketStub()),
    } as any);
    jest.spyOn(ticketModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(ticketStub()),
    } as any);

    const tickets = await service.exit({
      ticketId: ticketStub().parkingLotId,
    });
    expect(tickets).toEqual(ticketStub());
  });
});
