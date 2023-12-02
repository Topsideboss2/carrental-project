import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { PrismaModule } from '@carrental/prisma';
import { InvoiceModule } from '@carrental/invoice';
import { CarModule } from '@carrental/car';
import { NotificationsModule } from '@carrental/notifications';

@Module({
  imports: [PrismaModule, InvoiceModule, CarModule, NotificationsModule],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
