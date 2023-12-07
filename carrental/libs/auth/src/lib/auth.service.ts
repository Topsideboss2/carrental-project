import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, User, VerificationFor } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { UserLocationType } from '../types/current-country.types';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtTokenService: JwtService) {}
  async generateToken(user: User): Promise<string> {
    const payload = { username: user.email, sub: user.id };
    const accessToken = this.jwtTokenService.sign(payload, {
      expiresIn: '1d',
      secret:
        process.env.JWT_SECRET ||
        '455946a3a851109bba62e7398fed337b040d84b453d233aca6f61e4d770fdaee',
    });
    return accessToken;
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtTokenService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '15m',
        }
      ),
      this.jwtTokenService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: jwtConstants.refreshTokenSecret,
          expiresIn: '7d',
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async removeRefreshToken(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND
      );
    }
    return prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied: No user found');
    if (user.refreshToken !== refreshToken)
      throw new ForbiddenException('Access Denied: Token mismatch');
    const tokens = await this.getTokens(user.id, user.email);
    await this.setCurrentRefreshToken(tokens.refreshToken, user.id);
    return tokens;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    // const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // console.log('login => ', currentHashedRefreshToken)

    return await prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  public async validateUserCredentials(
    username: string,
    password: string
  ): Promise<User | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        email: username,
      },
    });
    if (
      user &&
      user.password !== null &&
      (await bcrypt.compare(password, user.password))
    ) {
      const { ...result } = user;
      return result;
    }
  }

  async addUserDevice(user: User, deviceId: string): Promise<unknown> {
    await prisma.device.upsert({
      where: {
        deviceId: deviceId,
      },
      update: {},
      create: {
        deviceId: deviceId,
        userId: user.id,
      },
    });
    return;
  }

  async generateVerificationCode(userId: string): Promise<string> {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    await prisma.verificationCode.create({
      data: {
        code: verificationCode,
        userId: userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      },
    });
    return verificationCode;
  }

  async verifyVerificationCode(userId: string, code: string): Promise<boolean | {valid: boolean, type: VerificationFor}> {
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        userId: userId,
        code: code,
      },
    });
    if (verificationCode?.status === 'SENT') {
      if (verificationCode.expiresAt > new Date()) {
        // change code to used
        await prisma.verificationCode.update({
          where: {
            id: verificationCode.id,
          },
          data: {
            status: 'USED',
          },
        });
        return {
          valid: true,
          type: verificationCode.codeFor
        };
      } else {
        // change code to expired
        await prisma.verificationCode.update({
          where: {
            id: verificationCode.id,
          },
          data: {
            status: 'EXPIRED',
          },
        });
        return false;
      }
    }
    return false;
  }
}
