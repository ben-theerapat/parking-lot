import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketDocument, Ticket } from './schemas/ticket.schema';
@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async getTicketStatus(carSize?): Promise<Ticket[]> {
    if (carSize) {
      return await this.ticketModel.find({ carSize }).exec();
    }
    return await this.ticketModel.find({}).exec();
  }
}
