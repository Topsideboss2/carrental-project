import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseInterceptors, UsePipes } from '@nestjs/common';
import { CarService } from './car.service';
import { CarValidationPipe } from '../pipes/car-validation.pipe';
import { CarAmenityDto, CarDto } from '../dto/car.dto';
import { CarAmenityService } from '@carrental/car-amenity';

@CacheKey('cars')
@CacheTTL(3000)
@UseInterceptors(CacheInterceptor)
@Controller('cars')
export class CarController {
  constructor(
    private carService: CarService,
    private carAmenityService: CarAmenityService
    ) {}

  @Get('all')
  async getCars() {
    return await this.carService.findAll();
  }

  @Get('show/:id')
  async getCar(@Param('id', ParseIntPipe) id: number) {
    return await this.carService.findOne(id);
  }

  @Post('create')
  @UsePipes(CarValidationPipe)
  async createCar(@Body() data: CarDto) {
    try {
      const { carAmenities, ...rest } = data;
      const car = await this.carService.create(rest);
      carAmenities.forEach(async (amenity: CarAmenityDto) => {
        await this.carAmenityService.create({
          carId: car.id,
          amenityId: amenity.amenityId,
          value: amenity.value
        })
      });
      return car;
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UsePipes(CarValidationPipe)
  async updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CarDto
  ) {
    try {
      const { carAmenities, ...rest } = data
      return await this.carService.update(id, rest);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deleteCar(@Param('id', ParseIntPipe) id: number) {
    return this.carService.delete(id);
  }
}
