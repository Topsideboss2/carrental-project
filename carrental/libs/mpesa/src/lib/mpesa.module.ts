import { Module } from '@nestjs/common';
import { MpesaController } from './mpesa.controller';
import { MpesaService } from './mpesa.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@carrental/prisma';
import { ReservationModule } from '@carrental/reservation';

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
    }),
  }),
  PrismaModule,
  ReservationModule
],
  controllers: [MpesaController],
  providers: [MpesaService],
  exports: [MpesaService],
})
export class MpesaModule {}
