import { PrismaService } from '@carrental/prisma';
import { Injectable } from '@nestjs/common';
import { CarMake } from '@prisma/client';
import { CarMakeDto } from '../dto/car-make.dto';

@Injectable()
export class CarMakeService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async findAll(): Promise<CarMake[]> {
    return await this.prismaService.carMake.findMany({});
  }

  async findOne(id: number): Promise<CarMake | null> {
    return await this.prismaService.carMake.findUnique({
      where: {
        id,
      },
      include: {
        cars: true
      }
    });
  }

  async create(data: CarMakeDto): Promise<CarMake> {
    return await this.prismaService.carMake.create({
      data,
    });
  }

  async update(id: number, data: CarMakeDto): Promise<CarMake> {
    return await this.prismaService.carMake.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<CarMake> {
    return await this.prismaService.carMake.delete({
      where: {
        id,
      },
    });
  }
}
