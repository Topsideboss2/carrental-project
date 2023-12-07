import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseInterceptors, UsePipes } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { PermissionValidationPipe } from '../pipes/permission-validation.pipe';
import { PermissionDto } from '../dto/permission.dto';
import { RolePermissionService } from '@carrental/role-permission';


@CacheKey('permissions')
@CacheTTL(3000)
@UseInterceptors(CacheInterceptor)
@Controller('permissions')
export class PermissionController {
  constructor(
    private permissionService: PermissionService,
    private rolePermissionService: RolePermissionService
    ) {}

  @Get('all')
  async getPermissions() {
    return await this.permissionService.findAll();
  }

  @Get('show/:id')
  async getPermission(@Param('id', ParseIntPipe) id: number) {
    return await this.permissionService.findOne(id);
  }

  @Post('create')
  @UsePipes(PermissionValidationPipe)
  async createPermission(@Body() data: PermissionDto) {
    try {
      return await this.permissionService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UsePipes(PermissionValidationPipe)
  async updatePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: PermissionDto
  ) {
    try {
      return await this.permissionService.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deletePermission(@Param('id', ParseIntPipe) id: number) {
    // delete the role-permission associated with it
    await this.rolePermissionService.deleteRolePermissionsBasedOnPermissionId(id);
    return this.permissionService.delete(id);
  }
}
