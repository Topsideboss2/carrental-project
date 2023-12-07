import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Post,
  Res,
  HttpStatus,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { PrismaClient, UserType } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any, @Res() res: Response) {
    if (!req.user.isActive)
      return res.status(HttpStatus.PRECONDITION_FAILED).json({
        message:
          'Cannot login into the platform, talk to our support team support@wakili.com',
      });
    if (!req.user.isEmailVerified)
      return res.status(HttpStatus.PRECONDITION_FAILED).json({
        message: 'Email not verified, kindly verify to proceed.',
      });
    const tokens = await this.authService.getTokens(
      req.user.id,
      req.user.email
    );
    await this.authService.setCurrentRefreshToken(
      tokens.refreshToken,
      req.user.id
    );
    await this.authService.addUserDevice(req.user, req.body.deviceId);

    if (req.user.userType === UserType.ADMIN) {
      const userRole = await prisma.userRole.findFirst({
        where: {
          userId: req.user.id,
        },
      });
      if (!userRole) {
        throw new ForbiddenException('User has no role defined');
      }
      const rolePermissions = await prisma.rolePermission.findMany({
        where: {
          roleId: userRole.roleId,
        },
        include: {
          permission: true,
        },
      });
      const permissions = rolePermissions.map((rp) => rp.permission);

      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        user: req.user,
        abilities: permissions,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        user: req.user,
      });
    }
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refresh')
  async refresh(@Request() req: any) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout/:userId')
  async logout(@Param('id') userId: string) {
    return this.authService.removeRefreshToken(userId);
  }
}
