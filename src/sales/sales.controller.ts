import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSalesDto } from './create-sales.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateSalesDto) {
    try {
      return await this.salesService.create(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get('total')
  getTotalRevenue() {
    return this.salesService.getTotalRevenue();
  }
}
