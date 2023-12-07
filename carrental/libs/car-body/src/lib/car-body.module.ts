import { Module } from '@nestjs/common';
import { CarBodyController } from './car-body.controller';
import { CarBodyService } from './car-body.service';
import { PrismaModule } from '@carrental/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [CarBodyController],
  providers: [CarBodyService],
  exports: [CarBodyService],
})
export class CarBodyModule {}
