import { ticketStub } from '../../ticket/test/stubs/ticket.stub';

export const CarService = jest.fn().mockReturnValue({
  park: jest.fn().mockResolvedValue(ticketStub()),
  exit: jest.fn().mockResolvedValue(ticketStub()),
});
