import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseInterceptors, UsePipes } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { AmenityValidationPipe } from '../pipes/amenity-validation.pipe';
import { AmenityDto } from '../dto/amenity.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@CacheKey('amenities')
@CacheTTL(3000)
@UseInterceptors(CacheInterceptor)
@Controller('amenities')
export class AmenityController {
  constructor(private amenityService: AmenityService) {}

  @Get('all')
  async getAmenities() {
    return await this.amenityService.findAll();
  }

  @Get('show/:id')
  async getAmenity(@Param('id', ParseIntPipe) id: number) {
    return await this.amenityService.findOne(id);
  }

  @Post('create')
  @UsePipes(AmenityValidationPipe)
  async createAmenity(@Body() data: AmenityDto) {
    try {
      return await this.amenityService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UsePipes(AmenityValidationPipe)
  async updateAmenity(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AmenityDto
  ) {
    try {
      return await this.amenityService.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deleteAmenity(@Param('id', ParseIntPipe) id: number) {
    return this.amenityService.delete(id);
  }
}
