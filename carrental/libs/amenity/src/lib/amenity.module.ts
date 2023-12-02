import { Module } from '@nestjs/common';
import { AmenityController } from './amenity.controller';
import { AmenityService } from './amenity.service';
import { PrismaModule } from '@carrental/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [AmenityController],
  providers: [AmenityService],
  exports: [AmenityService],
})
export class AmenityModule {}
