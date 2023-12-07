import { PrismaService } from '@carrental/prisma';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Payment, PaymentMethod } from '@prisma/client';
import { PaymentDto } from '../dto/payment.dto';
import { InvoiceService } from '@carrental/invoice';
import { MpesaService } from '@carrental/mpesa';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly invoiceService: InvoiceService,
    private readonly mpesaService: MpesaService
    ) {}
  async findAll(): Promise<Payment[]> {
    return await this.prismaService.payment.findMany({
      include: {
        user: true
      }
    });
  }

  async findOne(id: number): Promise<Payment | null> {
    return await this.prismaService.payment.findUnique({
      where: {
        id,
      },
      include: {
        user: true
      }
    });
  }

  async create(data: PaymentDto): Promise<Payment> {
    const { paymentMethod, userId, invoiceId, amount} = data
    try {
      const payment = await this.prismaService.payment.create({
        data: {
          paymentMethod,
          userId,
          invoiceId,
          amount
        }
      });

      if(data.paymentMethod === PaymentMethod.MPESA) {
        await this.mpesaService.stkPush({
          paymentId: payment.id,
          amount: data.amount,
          mpesaNumber: data.mpesaNumber
        })
      }

      return payment;
    } catch (error) {
      throw new InternalServerErrorException(error as string)
    }
  }

  async update(id: number, data: PaymentDto): Promise<Payment> {
    return await this.prismaService.payment.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Payment> {
    return await this.prismaService.payment.delete({
      where: {
        id,
      },
    });
  }
}
