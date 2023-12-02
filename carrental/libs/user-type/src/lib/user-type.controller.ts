import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserTypeService } from './user-type.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UserTypeDto } from '../dto/user-type.dto';
import { UserTypeValidationPipe } from '../pipes/usertype-validation.pipe';

@CacheKey('user-types')
@CacheTTL(3000)
@UseInterceptors(CacheInterceptor)
@Controller('user-types')
export class UserTypeController {
  constructor(private userTypeService: UserTypeService) {}

  @Get('all')
  async getUserTypes() {
    return await this.userTypeService.findAll();
  }

  @Get('show/:id')
  async getUserType(@Param('id', ParseIntPipe) id: number) {
    return await this.userTypeService.findOne(id);
  }

  @Post('create')
  @UsePipes(UserTypeValidationPipe)
  async createUserType(@Body() data: UserTypeDto) {
    try {
      return await this.userTypeService.create(data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Put('update/:id')
  @UsePipes(UserTypeValidationPipe)
  async updateUserType(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserTypeDto
  ) {
    try {
      return await this.userTypeService.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  @Delete('delete/:id')
  async deleteUserType(@Param('id', ParseIntPipe) id: number) {
    return this.userTypeService.delete(id);
  }
}
