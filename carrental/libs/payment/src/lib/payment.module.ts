import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { InvoiceModule } from '@carrental/invoice';
import { MpesaModule } from '@carrental/mpesa';
import { PrismaModule } from '@carrental/prisma';

@Module({
  imports: [PrismaModule, MpesaModule, InvoiceModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
