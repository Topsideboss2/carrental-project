import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PrismaModule } from '@carrental/prisma';
import { RolePermissionModule } from '@carrental/role-permission';

@Module({
  imports: [PrismaModule, RolePermissionModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
