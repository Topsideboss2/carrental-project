import { PrismaService } from '@carrental/prisma';
import { Injectable } from '@nestjs/common';
import { Car, Prisma } from '@prisma/client';

@Injectable()
export class CarService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<Car[]> {
    return await this.prismaService.car.findMany({
      include: {
        carMake: true,
        carBodyType: true,
        carMedias: true,
        carAmenities: {
          include: {
            amenity: true
          }
        }
      },
    });
  }

  async findOne(id: number): Promise<Car | null> {
    return await this.prismaService.car.findUnique({
      where: {
        id,
      },
      include: {
        carMake: true,
        carBodyType: true,
        carMedias: true,
        carAmenities: {
          include: {
            amenity: true
          }
        }
      },
    });
  }

  async create(data: Prisma.CarUncheckedCreateInput): Promise<Car> {
    return await this.prismaService.car.create({
      data,
    });
  }

  async update(id: number, data: Prisma.CarUncheckedCreateInput): Promise<Car> {
    return await this.prismaService.car.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Car> {
    return await this.prismaService.car.delete({
      where: {
        id,
      },
    });
  }
}
