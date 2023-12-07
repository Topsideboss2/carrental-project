import { Module } from '@nestjs/common';
import { CarAmenityController } from './car-amenity.controller';
import { CarAmenityService } from './car-amenity.service';
import { PrismaModule } from '@carrental/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [CarAmenityController],
  providers: [CarAmenityService],
  exports: [CarAmenityService],
})
export class CarAmenityModule {}
