import { PrismaService } from '@carrental/prisma';
import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { UserRoleDto } from '../dto/user-role.dto';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async findAll(): Promise<UserRole[]> {
    return await this.prismaService.userRole.findMany({});
  }

  async findOne(id: number): Promise<UserRole | null> {
    return await this.prismaService.userRole.findUnique({
      where: {
        id,
      },
    });
  }

  async assign(data: UserRoleDto): Promise<UserRole> {
    return await this.prismaService.userRole.upsert({
      where: {
        userId: data.userId,
      },
      create: data,
      update: data
    });
  }

  async delete(id: number): Promise<UserRole> {
    return await this.prismaService.userRole.delete({
      where: {
        id,
      },
    });
  }
}
