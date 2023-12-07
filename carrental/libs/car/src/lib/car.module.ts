import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { PrismaModule } from '@carrental/prisma';
import { CarAmenityModule } from '@carrental/car-amenity';

@Module({
  imports: [PrismaModule, CarAmenityModule],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
