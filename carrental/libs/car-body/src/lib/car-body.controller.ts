import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseInterceptors, UsePipes } from '@nestjs/common';
import { CarBodyService } from './car-body.service';
import { CarBodyValidationPipe } from '../pipes/car-body-validation.pipe';
import { CarBodyDto } from '../dto/car-body.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@CacheKey('car-bodies')
@CacheTTL(3000)
@UseInterceptors(CacheInterceptor)
@Controller('car-bodies')
export class CarBodyController {
  constructor(private carBodyService: CarBodyService) {}

  @Get('all')
  async getCarBodys() {
    return await this.carBodyService.findAll();
  }

  @Get('show/:id')
  async getCarBody(@Param('id', ParseIntPipe) id: number) {
    return await this.carBodyService.findOne(id);
  }

  @Post('create')
  @UsePipes(CarBodyValidationPipe)
  async createCarBody(@Body() data: CarBodyDto) {
    try {
      return await this.carBodyService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UsePipes(CarBodyValidationPipe)
  async updateCarBody(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CarBodyDto
  ) {
    try {
      return await this.carBodyService.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deleteCarBody(@Param('id', ParseIntPipe) id: number) {
    return this.carBodyService.delete(id);
  }
}
