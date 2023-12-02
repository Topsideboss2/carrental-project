import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from '../dto/payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('all')
  async getPayments() {
    return await this.paymentService.findAll();
  }

  @Get('show/:id')
  async getPayment(@Param('id', ParseIntPipe) id: number) {
    return await this.paymentService.findOne(id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createPayment(@Body() data: PaymentDto) {
    try {
      return await this.paymentService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UsePipes(ValidationPipe)
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: PaymentDto
  ) {
    try {
      return await this.paymentService.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deletePayment(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.delete(id);
  }
}
