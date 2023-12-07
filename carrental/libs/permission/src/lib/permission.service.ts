import { PrismaService } from '@carrental/prisma';
import { Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionDto } from '../dto/permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async findAll(): Promise<Permission[]> {
    return await this.prismaService.permission.findMany({});
  }

  async findOne(id: number): Promise<Permission | null> {
    return await this.prismaService.permission.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: PermissionDto): Promise<Permission> {
    return await this.prismaService.permission.create({
      data,
    });
  }

  async update(id: number, data: PermissionDto): Promise<Permission> {
    return await this.prismaService.permission.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Permission> {
    return await this.prismaService.permission.delete({
      where: {
        id,
      },
    });
  }
}
