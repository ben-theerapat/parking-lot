import { Test, TestingModule } from '@nestjs/testing';
import { Ticket } from '../schemas/ticket.schema';
import { TicketController } from '../ticket.controller';
import { TicketService } from '../ticket.service';
import { ticketStub } from './stubs/ticket.stub';

jest.mock('../ticket.service');

describe('TicketController', () => {
  let ticketController: TicketController;
  let ticketService: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [TicketService],
    }).compile();

    ticketController = module.get<TicketController>(TicketController);
    ticketService = module.get<TicketService>(TicketService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(ticketController).toBeDefined();
  });

  describe('getTicketStatus with query', () => {
    describe('when getTicketStatus with query is called', () => {
      let tickets: Ticket[];

      beforeEach(async () => {
        tickets = await ticketController.getTicketStatus('medium');
      });

      test('then it should call ticketService', () => {
        expect(ticketService.getTicketStatus).toHaveBeenCalled();
      });

      test('then it should return tickets', () => {
        expect(tickets).toEqual([ticketStub()]);
      });
    });
  });

  describe('getTicketStatus', () => {
    describe('when getTicketStatus is called', () => {
      let tickets: Ticket[];

      beforeEach(async () => {
        tickets = await ticketController.getTicketStatus();
      });

      test('then it should call ticketService', () => {
        expect(ticketService.getTicketStatus).toHaveBeenCalled();
      });

      test('then it should return tickets', () => {
        expect(tickets).toEqual([ticketStub()]);
      });
    });
  });
});
