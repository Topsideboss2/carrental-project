import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleDto } from '../dto/user-role.dto';

@Controller('user-roles')
export class UserRoleController {
  constructor(private userRoleService: UserRoleService) {}

  @Get('all')
  async getUserRoles() {
    return await this.userRoleService.findAll();
  }

  @Get('show/:id')
  async getUserRole(@Param('id', ParseIntPipe) id: number) {
    return await this.userRoleService.findOne(id);
  }

  @Post('assign')
  @UsePipes(ValidationPipe)
  async createUserRole(@Body() data: UserRoleDto) {
    try {
      return await this.userRoleService.assign(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deleteUserRole(@Param('id', ParseIntPipe) id: number) {
    return this.userRoleService.delete(id);
  }
}
