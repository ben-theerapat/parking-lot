import { Controller, Get, Query } from '@nestjs/common';
import { CarSize } from 'src/shared/car-size.type';
import { Ticket } from './schemas/ticket.schema';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async getTicketStatus(
    @Query('carSize') carSize?: CarSize,
  ): Promise<Ticket[]> {
    const result = await this.ticketService.getTicketStatus(carSize);
    return result;
  }
}
