import { PrismaService } from '@carrental/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reservation, ReservationStatus } from '@prisma/client';
import { ReservationDto } from '../dto/reservation.dto';
import { ReservationStatusDto } from '../dto/status.dto';
import { InvoiceService } from '@carrental/invoice';
import { CarService } from '@carrental/car';
import { NotificationsService } from '@carrental/notifications';

@Injectable()
export class ReservationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly invoiceService: InvoiceService,
    private readonly carService: CarService,
    private readonly notificationService: NotificationsService
  ) {}
  async findAll(): Promise<Reservation[]> {
    return await this.prismaService.reservation.findMany({
      include: {
        user: true,
        car: {
          include: {
            carMake: true
          }
        },
      }
    });
  }

  async findOne(id: number): Promise<Reservation | null> {
    return await this.prismaService.reservation.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        car: {
          include: {
            carMake: true
          }
        },
      }
    });
  }

  async findUserReservations(userId: string): Promise<Reservation[]> {
    return await this.prismaService.reservation.findMany({
      where: {
        userId
      },
      include: {
        car: {
          include: {
            carMake: true
          }
        },
      }
    })
  }

  async create(data: ReservationDto): Promise<Reservation> {
    return await this.prismaService.reservation.create({
      data,
    });
  }

  async update(id: number, data: ReservationDto): Promise<Reservation> {
    return await this.prismaService.reservation.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Reservation> {
    return await this.prismaService.reservation.delete({
      where: {
        id,
      },
    });
  }

  async approve(data: ReservationStatusDto) {
    const { reservationId, status } = data;
    const reservation = await this.findOne(reservationId);
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    const car = await this.prismaService.car.findUnique({
      where: {
        id: reservation.carId,
      },
    });
    if (!car) {
      throw new NotFoundException('Reservation not found');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: reservation.userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User for reservation not found');
    }

    if (reservation.status === status) {
      throw new BadRequestException(`Reservation status is already ${status}`);
    }
    const totalAmount = await this.calculateInvoiceAmount(reservation);
    if (status === ReservationStatus.APPROVED) {
      await this.invoiceService.create({
        userId: reservation.userId,
        reservationId: reservation.id,
        amount: totalAmount,
      });
    } else if (status === ReservationStatus.PENDING_PAYMENT) {
      // notification about the pending payment
    } else if (status === ReservationStatus.PAID) {
      const invoice = await this.prismaService.invoice.findFirst({
        where: {
          reservationId: reservation.id,
        },
      });

      if (!invoice) {
        throw new NotFoundException('Reservation Invoice not found');
      }
      const payment = await this.prismaService.payment.findFirst({
        where: {
          invoiceId: invoice.id,
        },
      });

      if (!payment) {
        throw new NotFoundException('Reservation Payment not found');
      }
      // notification about payment being received
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
        <td>${payment.createdAt.toLocaleString()}</td>
      </tr>
    `;

      // Update email body
      const emailBody = `
  <html>
    <body>
      <h1>Payment Received</h1>

      <p>Dear ${user.firstName} ${user.lastName},</p>

      <p>We have received your payment for Invoice RN00${reservationId}.</p>

      <p>Here is your payment receipt:</p>

      <table>
        ${invoiceDetailsRows}
      </table>

      <p>Your reservation process will now continue as planned.</p>

      <p>Thank you for your payment!</p>

      <p>Please reach out if you have any other questions.</p>

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
    } else if (status === ReservationStatus.DELIVERING) {
      // notitifation about car being delivered
      const emailBody = `
  <html>
    <body>
      <h1>Car En Route</h1>

      <p>Dear ${user.firstName} ${user.lastName},</p>

      <p>Your rented ${car.model} has left our station and is on the way to you.</p>

      <p>The driver is making their way to the delivery address you provided.</p>

      <p>Please reach out to us at 123-456-7890 if you need to get in touch with the driver or have any other questions.</p>

      <p>We will alert you when the car has arrived. Thank you!</p>

    </body>
  </html>
`;

      await this.notificationService.sendEmailNotification({
        app_code: process.env.FUTUREFAST_NOTIFICATION_APP_CODE || '',
        email: user.email,
        subject: 'Car Rental Invoice',
        body: emailBody,
      });
    } else if (status === ReservationStatus.CANCELLED) {
      // notification about reservation being canceled
    } else if (status === ReservationStatus.COMPLETED) {
      // notification about car having being delivered
      const emailBody = `
  <html>
    <body>
      <h1>Your Rental Car Has Arrived!</h1>

      <p>Dear ${user.firstName} ${user.lastName},</p>

      <p>We are happy to confirm your rented ${car.model} has arrived at the delivery address.</p>

      <p>The car has been successfully picked up and we hope you enjoy your travels!</p>

      <p>Please reach out if you need any assistance during your rental period. Our support team is available 24/7.</p>

      <p>We look forward to welcoming you back soon!</p>

      <p>Safe travels,</p>
      <p>The Team at Acme Rentals</p>

    </body>
  </html>
`;

      await this.notificationService.sendEmailNotification({
        app_code: process.env.FUTUREFAST_NOTIFICATION_APP_CODE || '',
        email: user.email,
        subject: 'Car Rental Invoice',
        body: emailBody,
      });
      // reduce the stock count of the car
      await this.prismaService.car.update({
        where: {
          id: reservation.carId,
        },
        data: {
          stock: car.stock - 1,
        },
      });
    } else if (status === ReservationStatus.REJECTED) {
      // notification about reservation being rejected
      const emailBody = `
  <html>
    <body>
      <h1>Rental Application Status</h1>

      <p>Dear ${user.firstName} ${user.lastName},</p>

      <p>Thank you for applying to rent a car from Car Rentals. Unfortunately, after reviewing your application, we are unable to approve it at this time.</p>

      <p>Our decision was based on factors like application details, verification process, and our rental policies. We regret that we cannot provide specifics on the exact reason for the rejection.</p>

      <p>We encourage you to review our rental requirements and eligibility criteria on our website to see if there are any areas you can address before applying again in the future.</p>

      <p>We appreciate your interest in Car Rentals. Please don't hesitate to contact us if you have any questions.</p>

      <p>Best regards,</p>
      <p>The Team at Car Rentals</p>

    </body>
  </html>
`;

      await this.notificationService.sendEmailNotification({
        app_code: process.env.FUTUREFAST_NOTIFICATION_APP_CODE || '',
        email: user.email,
        subject: 'Car Rental Invoice',
        body: emailBody,
      });
    } else if (status === ReservationStatus.RETURNED) {
      const emailBody = `
      <html>
        <body>
          <h1>Rental Car Returned</h1>

          <p>Dear ${user.firstName} ${user.lastName},</p>

          <p>This message is to confirm your rental of the ${car.model} has been returned and checked in successfully.</p>

          <p>Thank you for renting with Acme Rentals. It was a pleasure serving you!</p>

          <p>We hope you enjoyed your rental experience with us. We look forward to welcoming you back for your next adventure.</p>

          <p>Please reach out if you need any assistance or have any feedback on how we can improve.</p>

          <p>Safe travels and we hope to see you again soon!</p>

          <p>Best regards,</p>
          <p>The Team at Acme Rentals</p>

        </body>
      </html>
    `;
      await this.notificationService.sendEmailNotification({
        app_code: process.env.FUTUREFAST_NOTIFICATION_APP_CODE || '',
        email: user.email,
        subject: 'Car Rental Invoice',
        body: emailBody,
      });
      // reduce the stock count of the car
      await this.prismaService.car.update({
        where: {
          id: reservation.carId,
        },
        data: {
          stock: car.stock + 1,
        },
      });
      // return await this.prismaService.reservation.update({
      //   where: {
      //     id: reservationId,
      //   },
      //   data: {
      //     returnDate: new Date(),
      //     status,
      //   },
      // });
    } else {
      throw new BadRequestException('Provided status is unknown');
    }
    return await this.prismaService.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status,
      },
    });
  }

  private async calculateInvoiceAmount(
    reservation: Reservation
  ): Promise<number> {
    const car = await this.carService.findOne(reservation.carId);

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    const diffInMs = Math.abs(end.getTime() - start.getTime());
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    const amount = diffInDays * car.dailyRate;

    return amount;
  }
}
