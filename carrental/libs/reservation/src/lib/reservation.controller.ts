import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from '../dto/reservation.dto';
import { ReservationStatusDto } from '../dto/status.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Get('all')
  async getReservations() {
    return await this.reservationService.findAll();
  }

  @Get('show/:id')
  async getReservation(@Param('id', ParseIntPipe) id: number) {
    return await this.reservationService.findOne(id);
  }

  @Get('user/:user')
  async getUserReservations(@Param('user') user: string) {
    return await this.reservationService.findUserReservations(user);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createReservation(@Body() data: ReservationDto) {
    try {
      return await this.reservationService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UsePipes(ValidationPipe)
  async updateReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ReservationDto
  ) {
    try {
      return await this.reservationService.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deleteReservation(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.delete(id);
  }

  @Post('approve')
  @UsePipes(ValidationPipe)
  async approveReservation(@Body() data: ReservationStatusDto) {
    try {
      return await this.reservationService.approve(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }
}
