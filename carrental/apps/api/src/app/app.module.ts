import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { PrismaModule } from '@carrental/prisma'
import { RoleModule } from '@carrental/role';
import { PermissionModule } from '@carrental/permission'
import { RolePermissionModule } from '@carrental/role-permission';
import { AuthModule } from '@carrental/auth';
import { UserModule } from '@carrental/user';
import { UserRoleModule } from '@carrental/user-role';
import { CarMakeModule } from '@carrental/car-make'
import { CarModule } from '@carrental/car'
import { ReservationModule } from '@carrental/reservation'
import { MpesaModule } from '@carrental/mpesa';
import { PaymentModule } from '@carrental/payment';
import { InvoiceModule } from '@carrental/invoice';
import { MulterModule } from '@nestjs/platform-express';
import { CarMediaModule } from '@carrental/car-media';
import { MulterService } from '@carrental/multer';
import { AmenityModule } from '@carrental/amenity';
import { CarBodyModule } from '@carrental/car-body';
import { CloudinaryModule } from '@carrental/cloudinary';
import { ReportModule } from '@carrental/report';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.local', '.env'],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: cfg.get('REDIS_HOST'),
            port: parseInt(cfg.get('REDIS_PORT ') || '6379'),
          },
          password: cfg.get('REDIS_PASSWORD'),
          ttl: cfg.get('REDIS_TTL'),
        }),
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    MulterModule.registerAsync({
      useClass: MulterService
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    UserRoleModule,
    CarMakeModule,
    CarModule,
    ReservationModule,
    MpesaModule,
    InvoiceModule,
    PaymentModule,
    CarMediaModule,
    AmenityModule,
    CarBodyModule,
    CloudinaryModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
