import { Module } from '@nestjs/common';
import { UserTypeController } from './user-type.controller';
import { UserTypeService } from './user-type.service';
import { PrismaModule } from '@carrental/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [UserTypeController],
  providers: [UserTypeService],
  exports: [UserTypeService],
})
export class UserTypeModule {}
