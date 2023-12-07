import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseInterceptors, UsePipes } from '@nestjs/common';
import { CarMakeService } from './car-make.service';
import { CarMakeValidationPipe } from '../pipes/car-make-validation.pipe';
import { CarMakeDto } from '../dto/car-make.dto';

@CacheKey('car-makes')
@CacheTTL(3000)
@UseInterceptors(CacheInterceptor)
@Controller('car-makes')
export class CarMakeController {
  constructor(private carMakeService: CarMakeService) {}

  @Get('all')
  async getCarMakes() {
    return await this.carMakeService.findAll();
  }

  @Get('show/:id')
  async getCarMake(@Param('id', ParseIntPipe) id: number) {
    return await this.carMakeService.findOne(id);
  }

  @Post('create')
  @UsePipes(CarMakeValidationPipe)
  async createCarMake(@Body() data: CarMakeDto) {
    try {
      return await this.carMakeService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UsePipes(CarMakeValidationPipe)
  async updateCarMake(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CarMakeDto
  ) {
    try {
      return await this.carMakeService.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deleteCarMake(@Param('id', ParseIntPipe) id: number) {
    return this.carMakeService.delete(id);
  }
}
