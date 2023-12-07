import { PrismaService } from '@carrental/prisma';
import { Injectable } from '@nestjs/common';
import { CarBodyType } from '@prisma/client';
import { CarBodyDto } from '../dto/car-body.dto';

@Injectable()
export class CarBodyService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async findAll(): Promise<CarBodyType[]> {
    return await this.prismaService.carBodyType.findMany({});
  }

  async findOne(id: number): Promise<CarBodyType | null> {
    return await this.prismaService.carBodyType.findUnique({
      where: {
        id,
      },
      include: {
        cars: true
      }
    });
  }

  async create(data: CarBodyDto): Promise<CarBodyType> {
    return await this.prismaService.carBodyType.create({
      data,
    });
  }

  async update(id: number, data: CarBodyDto): Promise<CarBodyType> {
    return await this.prismaService.carBodyType.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<CarBodyType> {
    return await this.prismaService.carBodyType.delete({
      where: {
        id,
      },
    });
  }
}
