import { INotificationsService, ISingleEmail, ISingleSMS } from './../types/types';
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { PrismaClient, Device } from '@prisma/client';
import https = require('https');

const prisma = new PrismaClient();
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { lastValueFrom, map } from 'rxjs';


@Injectable()
export class NotificationsService {
  constructor(private readonly httpService: HttpService) {}

  async sendPushNotification(userId: string, message: string): Promise<string> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user) {
        const devices = await prisma.device.findMany({
          where: {
            userId: userId,
          },
        });

        if (devices) {
          devices.forEach(async (device: Device) => {
            await this.sendNotification({
              app_id: '65eea8e2-7c77-4aff-b0da-12ff7f660029',
              contents: { en: message },
              channel_for_external_user_ids: 'push',
              include_external_user_ids: [device.deviceId],
            });
          });
        }
      }
      return 'success';
    } catch (error) {
      throw new Error('Error sending push notification');
    }
  }

  async sendEmailNotification(data: ISingleEmail) {
    const response = await lastValueFrom(
      this.httpService.post(`${process.env.FUTUREFAST_NOTIFICATION_URL}email`, data).pipe(
        map((response) => {
          return response.data;
        })
      )
    );

    return response;
  }

  async sendSMSNotification(data: ISingleSMS) {
    const response = await lastValueFrom(
      this.httpService.post(`${process.env.FUTUREFAST_NOTIFICATION_URL}sms`, data).pipe(
        map((response) => {
          return response.data;
        })
      )
    );

    return response;
  }


  private async sendNotification(data: INotificationsService) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Basic MjQ0ZjQ2NjctM2Q2ZC00NmZhLWI3OTEtODgzZDQ0N2ZlYmIw',
    };

    const options = {
      host: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: headers,
    };

    const req = https.request(
      options,
      function (res: {
        on: (arg0: string, arg1: (data: any) => void) => void;
      }) {
        res.on('data', function (data) {
          // console.log('Response:');
          // console.log(JSON.parse(data));
        });
      }
    );

    req.on('error', function (e: any) {
      console.log('ERROR:');
      console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
  }

  async sendSlackNotification(payload: {
    text?: string;
    blocks?: unknown[];
    url: string;
  }) {
    const headers = {
      'Content-type': 'application/json',
    };


    this.httpService.post(payload.url, payload, {
      headers
    }).subscribe((response) => {
      console.log('slack notification sent => ', response.data)
    });
    return 'success';
  }
}
