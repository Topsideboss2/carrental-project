import { Module } from '@nestjs/common';
import { CarMediaController } from './car-media.controller';
import { CarMediaService } from './car-media.service';
import { PrismaModule } from '@carrental/prisma';
import { CloudinaryModule } from '@carrental/cloudinary'

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [CarMediaController],
  providers: [CarMediaService],
  exports: [CarMediaService],
})
export class CarMediaModule {}
