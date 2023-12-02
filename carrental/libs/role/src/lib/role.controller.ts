import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseInterceptors, UsePipes } from '@nestjs/common';
import { RoleService } from './role.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RoleValidationPipe } from '../pipes/role-validation.pipe';
import { RoleDto } from '../dto/role.dto';
import { RolePermissionService } from '@carrental/role-permission';

@CacheKey('roles')
@CacheTTL(3000)
@UseInterceptors(CacheInterceptor)
@Controller('roles')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private readonly rolePermissionService: RolePermissionService
    ) {}

  @Get('all')
  async getRoles() {
    return await this.roleService.findAll();
  }

  @Get('show/:id')
  async getRole(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.findOne(id);
  }

  @Post('create')
  @UsePipes(RoleValidationPipe)
  async createRole(@Body() data: RoleDto) {
    try {
      return await this.roleService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UsePipes(RoleValidationPipe)
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: RoleDto
  ) {
    try {
      return await this.roleService.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    // delete the role-permission associated with it
    await this.rolePermissionService.deleteRolePermissionsBasedOnRoleId(id);
    return this.roleService.delete(id);
  }
}
