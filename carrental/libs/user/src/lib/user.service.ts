import { ForgotPasswordDto, ResetPasswordDto } from './../dto/login.dto';
import { VerifyDto } from './../dto/verify.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User, VerificationFor } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@carrental/auth';
import { NotificationsService } from '@carrental/notifications';
import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RegisterDto } from '../dto/register.dto';
import { PrismaService } from '@carrental/prisma';

// import toStream = require('buffer-to-stream');

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private eventEmitter: EventEmitter2,
    private readonly prismaService: PrismaService
  ) {}

  public async create(params: RegisterDto): Promise<User> {
    const { firstName, lastName, phoneNumber, email, password } = params;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
      },
    });

    // email verification code
    const verificationCode = await this.authService.generateVerificationCode(
      user.id
    );

    // Send the password to the user email
    await this.notificationService.sendEmailNotification({
      app_code: process.env.FUTUREFAST_NOTIFICATION_APP_CODE || '',
      email,
      subject: 'Welcome',
      body: `<html> <body> <h1>Welcome to our Platform!</h1> <p>Dear ${firstName},</p> <p>We're excited to have you as part of our community.</p> <p>Your email verification code is: <b>${verificationCode}</b></p> <p>Please login using your email and password to access the platform.</p><p>The Wakili Team</p> </body> </html>`,
    });

    return user;
  }

  public async validateUserCredentials(
    username: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.findOneByEitherPhoneNumberOrEmail(username);
    if (
      user &&
      user.password !== null &&
      (await bcrypt.compare(password, user.password))
    ) {
      const { ...result } = user;
      return result;
    }
  }

  public async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        phoneNumber,
      },
    });
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  }


  public async findOneByEitherPhoneNumberOrEmail(
    username: string
  ): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        OR: [
          {
            phoneNumber: username,
          },
          {
            email: username,
          },
        ],
      },
    });
  }

  public async findAll(params: Prisma.UserFindManyArgs): Promise<User[]> {
    return prisma.user.findMany({
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      }
    });
  }

  public async verifyCodes(
    params: VerifyDto,
    res: any
  ): Promise<string> {

    const { userId, code } = params;

    const verification = await this.authService.verifyVerificationCode(userId, code);

    if (verification === false) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Verification code is invalid' });

    } else if (typeof verification === 'object') {
      if (verification.valid) {
        if(verification.type === VerificationFor.EMAIL) {
          // update the user isEmailVerified
          await prisma.user.update({
            where: {
              id: userId
            },
            data: {
              isEmailVerified: true
            }
          })
        } else if(verification.type === VerificationFor.PHONE){
          // update the user isEmailVerified
          await prisma.user.update({
            where: {
              id: userId
            },
            data: {
              isPhoneVerified: true
            }
          })
        }
        return res
          .status(HttpStatus.OK)
          .json({ message: 'Verification code is valid' });
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Verification code is invalid' });
      }

    } else {
      // Unexpected response from verifyVerificationCode
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Unexpected error' });
    }

  }

  public async forgotPassword(
    params: ForgotPasswordDto,
    res: any
  ): Promise<any> {
    const { email } = params;
    const user = await this.findOneByEmail(email);

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    const verificationCode = await this.authService.generateVerificationCode(
      user.id
    );
    // send verification code to user via email or sms
    // if (email && email !== null) {
    //   await this.notificationService.sendEmailWithPostmark({
    //     to: email,
    //     templateId: 30253684,
    //     name: user.username,
    //   });
    // } else if (phone && phone !== null) {
    //   await this.notificationService.sendSMSNotification({
    //     to: [`+${user.phoneNumber}`],
    //     message: `Your verification code is ${verificationCode}`,
    //   });
    // }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Forgot password code sent successfully' });
  }

  public async resetPassword(
    req: ResetPasswordDto,
    res: any
  ): Promise<any> {
    const { email, password } = req;
    const user = await this.findOneByEmail(email)
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Password reset successfully' });
  }

  public async findOneById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
