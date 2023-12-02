import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { PrismaModule } from '@carrental/prisma';
import { NotificationsModule } from '@carrental/notifications';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
