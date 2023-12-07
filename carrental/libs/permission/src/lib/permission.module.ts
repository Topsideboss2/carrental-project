import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PrismaModule } from '@carrental/prisma';
import { RolePermissionModule } from '@carrental/role-permission';

@Module({
  imports: [PrismaModule, RolePermissionModule],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
