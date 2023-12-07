import { Module } from '@nestjs/common';
import { CarMakeController } from './car-make.controller';
import { CarMakeService } from './car-make.service';
import { PrismaModule } from '@carrental/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [CarMakeController],
  providers: [CarMakeService],
  exports: [CarMakeService],
})
export class CarMakeModule {}
