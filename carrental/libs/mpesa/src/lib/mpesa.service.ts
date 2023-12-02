import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import {
  PaymentStatus,
  Prisma,
  PrismaClient,
  ReservationStatus,
  TransactionStatus,
} from '@prisma/client';
import { ISTKPUSH, IPAYMENTVALIDATION, IMpesaRequest } from './types';
import { PrismaService } from '@carrental/prisma';
import { ReservationService } from '@carrental/reservation';

const prisma = new PrismaClient();

@Injectable()
export class MpesaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
    private readonly reservationService: ReservationService
  ) {}

  private getTimestamp() {
    const date = new Date();

    const timestamp =
      date.getFullYear() +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      ('0' + date.getDate()).slice(-2) +
      ('0' + date.getHours()).slice(-2) +
      ('0' + date.getMinutes()).slice(-2) +
      ('0' + date.getSeconds()).slice(-2);

    return timestamp;
  }

  private lipaNaMpesaPassword() {
    const lipaNaMpesaShortCode: string = process.env.MPESA_SHORTCODE || '';
    const lipaNaMpesaPassKey: string = process.env.MPESA_PASSKEY || '';
    const lipaNaMpesaTimestamp: string = this.getTimestamp();
    const lipaNaMpesaPassword: string = Buffer.from(
      lipaNaMpesaShortCode + lipaNaMpesaPassKey + lipaNaMpesaTimestamp
    ).toString('base64');
    return lipaNaMpesaPassword;
  }
  private async getOAuthToken() {
    const consumerKey: string = process.env.MPESA_CONSUMER_KEY || '';
    const consumerSecret: string = process.env.MPESA_CONSUMER_SECRET || '';

    const auth = `Basic ${Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString('base64')}`;
    try {
      const headers = {
        Authorization: auth,
      };
      const data_ = await lastValueFrom(
        this.httpService
          .get(
            `${process.env.SAFARICOM_URL}oauth/v1/generate?grant_type=client_credentials`,
            { headers: headers }
          )
          .pipe(
            map((response) => {
              return response.data.access_token;
            })
          )
      );
      return data_;
    } catch (error) {
      console.log(error);
    }
  }

  //stkpush function
  public async stkPush(data: ISTKPUSH) {
    const { mpesaNumber, paymentId } = data;
    const payment = await this.prismaService.payment.findUnique({
      where: {
        id: paymentId,
      },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    const { amount } = payment;
    const timestamp = this.getTimestamp();
    const payload = this.buildStkPushPayload(amount, mpesaNumber, timestamp);

    const headers = {
      Authorization: `Bearer ${await this.getOAuthToken()}`,
    };

    const data_ = await lastValueFrom(
      this.httpService
        .post(
          `${process.env.SAFARICOM_URL}mpesa/stkpush/v1/processrequest`,
          payload,
          { headers: headers }
        )
        .pipe(
          map((response) => {
            return response.data;
          })
        )
    );

    console.log('data-text', data_);

    if (data_) {
      const { MerchantRequestID } = data_;

      await this.prismaService.transactionEscrow.create({
        data: {
          transactionNumber: MerchantRequestID || '',
          userId: payment.userId,
          invoiceId: payment.invoiceId,
          paymentId: payment.id,
          amount: payment.amount,
        },
      });
    }
    return data_;
  }

  private buildStkPushPayload(
    amount: number,
    mpesaNumber: string,
    timestamp: string
  ): IMpesaRequest {
    return {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: this.lipaNaMpesaPassword(),
      Timestamp: `${timestamp}`,
      TransactionType: 'CustomerPayBillOnline',
      Amount: `${amount}`,
      PartyA: `${mpesaNumber}`,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: `${mpesaNumber}`,
      CallBackURL: `${process.env.MPESA_CALLBACK_URL}mpesa/callback/url`,
      AccountReference: 'Car Rental',
      TransactionDesc: 'Car Rental',
    };
  }

  public async mpesaCallback(data: any) {
    //save the response to the database
    const {Body: {stkCallback : {MerchantRequestID, CheckoutRequestID, CallbackMetadata: {Item}}}} = data;

    const mpesa: Prisma.MpesaTransactionUncheckedCreateInput = {
      merchantRequestID: MerchantRequestID,
      checkoutRequestID: CheckoutRequestID,
      transactionID: Item.find(i => i.Name === 'MpesaReceiptNumber')?.Value ?? '',
      transactionTime: String(Item.find(i => i.Name === 'TransactionDate')?.Value ?? ''),
      phoneNumber: String(Item.find(i => i.Name === 'PhoneNumber')?.Value ?? ''),
      transactionAmount: +Item.find(i => i.Name === 'Amount')?.Value ?? 0
    };

    try {
      // Create mpesa record
      await this.create(mpesa);
      // Update transaction escrow
      const transaction = await this.prismaService.transactionEscrow
      .update({
        where: {
          transactionNumber: MerchantRequestID,
        },
        data: {
          status: 'PAID',
        },
      })

      const { paymentId, invoiceId } = transaction;

      await this.prismaService.payment.update({
        where: {
          id: paymentId,
        },
        data: {
          status: TransactionStatus.COMPLETED,
        },
      });

      const invoice = await this.prismaService.invoice.update({
        where: {
          id: invoiceId,
        },
        data: {
          status: PaymentStatus.PAID,
        },
      });
      const { reservationId } = invoice;
      await this.reservationService.approve({reservationId, status: ReservationStatus.PAID})
      return 'success';

    } catch (error) {
      console.error('Error handling mpesa callback', error);
      throw error;
    }
  }

  public async paymentValidation(data: IPAYMENTVALIDATION): Promise<boolean> {
    // check if the payment has been made in the escrow in the last 24 hours
    const payment = await prisma.mpesaTransaction.findFirst({
      where: {
        merchantRequestID: data.merchantId,
        checkoutRequestID: data.checkoutId,
      },
    });
    if (payment === null) {
      return false;
    }
    return true;
  }

  public test() {
    const data = {
      Body: {
        stkCallback: {
          MerchantRequestID: '23208-15914156-1',
          CheckoutRequestID: 'ws_CO_21082023105355148741424797',
          ResultCode: 0,
          ResultDesc: 'The service request is processed successfully.',
          CallbackMetadata: {
            Item: [
              {
                Name: 'Amount',
                Value: 1,
              },
              {
                Name: 'MpesaReceiptNumber',
                Value: 'RHL4NJLSCQ',
              },
              {
                Name: 'TransactionDate',
                Value: 20230821105302,
              },
              {
                Name: 'PhoneNumber',
                Value: 254741424797,
              },
            ],
          },
        },
      },
    };

    const {Body: {stkCallback : {MerchantRequestID, CheckoutRequestID, ResultCode, CallbackMetadata: {Item}}}} = data;

    const mpesa = {
      merchantRequestID: MerchantRequestID,
      checkoutRequestID: CheckoutRequestID,
      transactionID: Item.find(i => i.Name === 'MpesaReceiptNumber')?.Value ?? '',
      transactionTime: Item.find(i => i.Name === 'TransactionDate')?.Value ?? '',
      phoneNumber: Item.find(i => i.Name === 'PhoneNumber')?.Value ?? '',
      transactionAmount: +Item.find(i => i.Name === 'Amount')?.Value ?? 0
    };

    console.log('data =>', mpesa)

    return mpesa
  }

  async create(data: Prisma.MpesaTransactionUncheckedCreateInput) {
    return this.prismaService.mpesaTransaction.create({
      data
    });
  }
}
