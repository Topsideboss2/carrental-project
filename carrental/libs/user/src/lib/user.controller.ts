import { ResetPasswordDto, ForgotPasswordDto } from './../dto/login.dto';
import { VerifyDto } from './../dto/verify.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  UseGuards,
  Res,
  Param,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { AuthService } from '@carrental/auth';
import { RegisterDto } from '../dto/register.dto';


@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUser(@Body() params: RegisterDto, @Res() res: Response) {
    try {
      const user = await this.userService.create(params);
      if (!user)
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'User could not be created' });

      // log the user in on a new account creation
      if (user) {
        const tokens = await this.authService.getTokens(
          user.id,
          user.email || ''
        );
        await this.authService.setCurrentRefreshToken(
          tokens.refreshToken,
          user.id
        );
        await this.authService.addUserDevice(user, params.deviceId);
        return res.status(HttpStatus.OK).json({
          message: 'User created successfully and logged in',
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
          user: user,
        });
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'User could not be created' });
      }
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllUsers(@Body() params: Prisma.UserFindManyArgs) {
    return this.userService.findAll(params);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('show/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Post('verify')
  async verifyCodes(@Body() params: VerifyDto, @Res() res: Response) {
    return this.userService.verifyCodes(params, res);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() params: ForgotPasswordDto,
    @Res() res: Response
  ) {
    return await this.userService.forgotPassword(params, res);
  }

  @Post('reset-password')
  async resetPassword(@Body() params: ResetPasswordDto, @Res() res: Response) {
    return await this.userService.resetPassword(params, res);
  }
}
