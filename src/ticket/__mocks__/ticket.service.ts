import { ticketStub } from '../test/stubs/ticket.stub';

export const TicketService = jest.fn().mockReturnValue({
  getTicketStatus: jest.fn().mockResolvedValue([ticketStub()]),
});
