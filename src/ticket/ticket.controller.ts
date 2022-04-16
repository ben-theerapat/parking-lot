import { Controller, Get, Query } from '@nestjs/common'
import { CarSizeEnum } from 'src/shared/car-size.enum'
import { Ticket } from './schemas/ticket.schema'
import { TicketService } from './ticket.service'

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async getTicketStatus(@Query('carSize') carSize?: CarSizeEnum): Promise<Ticket[]> {
    return await this.ticketService.getTicketStatus({ carSize })
  }
}
