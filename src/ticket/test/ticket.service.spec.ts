import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from '../ticket.service';
import { getModelToken } from '@nestjs/mongoose';
import { ticketStub } from './stubs/ticket.stub';
import { TicketDocument } from '../schemas/ticket.schema';
import { Model } from 'mongoose';

describe('TicketService', () => {
  let service: TicketService;
  let model: Model<TicketDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: getModelToken('Ticket'),
          useValue: {
            new: jest.fn().mockResolvedValue(ticketStub()),
            constructor: jest.fn().mockResolvedValue(ticketStub()),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
    model = module.get<Model<TicketDocument>>(getModelToken('Ticket'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getTicketStatus should return tickets', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([ticketStub()]),
    } as any);
    const tickets = await service.getTicketStatus();
    expect(tickets).toEqual([ticketStub()]);
  });

  it('getTicketStatus with carSize params should return tickets', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([ticketStub()]),
    } as any);
    const tickets = await service.getTicketStatus('large');
    expect(tickets).toEqual([ticketStub()]);
  });
});
