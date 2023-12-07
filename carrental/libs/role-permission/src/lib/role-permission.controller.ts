import { Body, Controller, InternalServerErrorException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionDto } from '../dto/role-permission.dto';

@Controller('role-permissions')
export class RolePermissionController {
  constructor(private rolePermissionService: RolePermissionService) {}

  @Post('assign')
  @UsePipes(ValidationPipe)
  async updateRolePermission(@Body() data: RolePermissionDto) {
    try {
      const updatedPermissions = await this.rolePermissionService.updateRolePermissions(data);
      return `Role permissions updated successfully: ${updatedPermissions}`;
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

}
