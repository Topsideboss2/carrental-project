import { PrismaService } from '@carrental/prisma';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Invoice } from '@prisma/client';
import { InvoiceDto } from '../dto/invoice.dto';
import { NotificationsService } from '@carrental/notifications';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationsService
  ) {}
  async findAll(): Promise<Invoice[]> {
    return await this.prismaService.invoice.findMany({
      include: {
        reservation: {
          include: {
            user: true,
            car: {
              include: {
                carMake: true
              }
            }
          }
        }
      }
    });
  }

  async findOne(id: number): Promise<Invoice | null> {
    return await this.prismaService.invoice.findUnique({
      where: {
        id,
      },
      include: {
        reservation: {
          include: {
            user: true,
            car: {
              include: {
                carMake: true
              }
            }
          }
        }
      }
    });
  }

  async findUserInvoices(id: string): Promise<Invoice[]> {
    return await this.prismaService.invoice.findMany({
      where: {
        userId: id
      },
      include: {
        reservation: {
          include: {
            car: true
          }
        }
      }
    })
  }

  async create(data: InvoiceDto): Promise<Invoice> {
    try {
      const { reservationId, userId } = data;
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new NotFoundException('Invoice user not found');
      }

      const reservation = await this.prismaService.reservation.findUnique({
        where: {
          id: reservationId
        }
      })
      if(!reservation) {
        throw new NotFoundException('Reservation not found');
      }

      const car = await this.prismaService.car.findUnique({
        where: {
          id: reservation.carId
        }
      })
      if(!car) {
        throw new NotFoundException('Car not found');
      }

      const invoice = await this.prismaService.invoice.create({
        data,
      });

      const invoiceDetailsRows = `
  <tr>
    <td>Reservation Number</td>
    <td>RN00${invoice.reservationId}</td>
  </tr>
  <tr>
    <td>Invoice To</td>
    <td>${user.firstName} ${user.lastName}</td>
  </tr>
  <tr>
    <td>Invoice Item</td>
    <td>${car.model} ${car.year}</td>
  </tr>
  <tr>
    <td>Amount</td>
    <td>Ksh.${invoice.amount}</td>
  </tr>
  <tr>
    <td>Status</td>
    <td>${invoice.status}</td>
  </tr>
  <tr>
    <td>Created</td>
    <td>${invoice.createdAt.toLocaleString()}</td>
  </tr>
`;

      // Update email body
      const emailBody = `
  <html>
    <body>
      <h1>Invoice Notice</h1>
      <p>Dear ${user.firstName} ${user.lastName},</p>
      <p>Congratulations, your car rent request has been approved</p>
      <p>Here are the details of your invoice: RN00${reservationId}</p>
      <table>
        ${invoiceDetailsRows}
      </table>
      <p>Please login to view the full invoice and payment options. The reservation process will continue after the payment is made.</p>
      <p>Thank you!</p>
    </body>
  </html>
`;
      // send invoice notification to user
      await this.notificationService.sendEmailNotification({
        app_code: process.env.FUTUREFAST_NOTIFICATION_APP_CODE || '',
        email: user.email,
        subject: 'Car Rental Invoice',
        body: emailBody,
      });

      return invoice;
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  async update(id: number, data: InvoiceDto): Promise<Invoice> {
    return await this.prismaService.invoice.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Invoice> {
    return await this.prismaService.invoice.delete({
      where: {
        id,
      },
    });
  }
}
