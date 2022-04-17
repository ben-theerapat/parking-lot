import { Test, TestingModule } from '@nestjs/testing';
import { ParkinglotService } from '../parkinglot.service';
import { getModelToken } from '@nestjs/mongoose';
import { createParkinglotStub, parkinglotStub } from './stubs/parkinglot.stub';
import { ParkinglotDocument } from '../shemas/parkinglot.schema';
import { Model } from 'mongoose';

describe('ParkinglotService', () => {
  let service: ParkinglotService;
  let model: Model<ParkinglotDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkinglotService,
        {
          provide: getModelToken('Parkinglot'),
          useValue: {
            constructor: jest.fn().mockResolvedValue(parkinglotStub()),
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ParkinglotService>(ParkinglotService);
    model = module.get<Model<ParkinglotDocument>>(getModelToken('Parkinglot'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createParkingLot should return parkinglot', async () => {
    jest.spyOn(model, 'create').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(parkinglotStub()),
    } as any);
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(parkinglotStub()),
    } as any);

    const parkinglot = await service.createParkingLot(createParkinglotStub());
    console.log('parkinglot', parkinglot);
    expect(parkinglot).toEqual(parkinglotStub());
  });

  it('getStatus should return available parkinglot', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([parkinglotStub()]),
    } as any);
    const parkinglots = await service.getStatus();
    expect(JSON.stringify(parkinglots)).toEqual(
      JSON.stringify([parkinglotStub()]),
    );
  });
});
