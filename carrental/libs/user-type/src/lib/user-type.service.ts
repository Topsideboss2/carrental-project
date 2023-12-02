import { PrismaService } from '@carrental/prisma';
import { Injectable } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { UserTypeDto } from '../dto/user-type.dto';

@Injectable()
export class UserTypeService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async findAll(): Promise<UserType[]> {
    return await this.prismaService.userType.findMany({});
  }

  async findOne(id: number): Promise<UserType | null> {
    return await this.prismaService.userType.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: UserTypeDto): Promise<UserType> {
    return await this.prismaService.userType.create({
      data,
    });
  }

  async update(id: number, data: UserTypeDto): Promise<UserType> {
    return await this.prismaService.userType.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<UserType> {
    return await this.prismaService.userType.delete({
      where: {
        id,
      },
    });
  }
}
