import { AuthModule, AuthService } from '@carrental/auth';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { NotificationsModule, NotificationsService } from "@carrental/notifications"
import { PrismaModule } from '@carrental/prisma';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    AuthModule,
    NotificationsModule,
    PrismaModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    NotificationsService,
    JwtService,
  ],
  exports: [UserService],
})
export class UserModule {}
