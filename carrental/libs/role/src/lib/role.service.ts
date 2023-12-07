import { PrismaService } from '@carrental/prisma';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RoleDto } from '../dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async findAll(): Promise<Role[]> {
    return await this.prismaService.role.findMany({});
  }

  async findOne(id: number): Promise<Role | null> {
    return await this.prismaService.role.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: RoleDto): Promise<Role> {
    return await this.prismaService.role.create({
      data,
    });
  }

  async update(id: number, data: RoleDto): Promise<Role> {
    return await this.prismaService.role.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Role> {
    return await this.prismaService.role.delete({
      where: {
        id,
      },
    });
  }
}
