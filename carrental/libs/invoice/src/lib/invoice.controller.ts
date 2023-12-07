import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from '../dto/invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get('all')
  async getInvoices() {
    return await this.invoiceService.findAll();
  }

  @Get('show/:id')
  async getInvoice(@Param('id', ParseIntPipe) id: number) {
    return await this.invoiceService.findOne(id);
  }

  @Get('user/:id')
  async getUserInvoices(@Param('id') id: string) {
    return await this.invoiceService.findUserInvoices(id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createInvoice(@Body() data: InvoiceDto) {
    try {
      return await this.invoiceService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UsePipes(ValidationPipe)
  async updateInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: InvoiceDto
  ) {
    try {
      return await this.invoiceService.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deleteInvoice(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.delete(id);
  }
}
