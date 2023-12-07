import { PrismaService } from '@carrental/prisma';
import { Injectable } from '@nestjs/common';
import { CarAmenity } from '@prisma/client';
import { CarAmenityDto } from '../dto/car-amenity.dto';

@Injectable()
export class CarAmenityService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async findAll(): Promise<CarAmenity[]> {
    return await this.prismaService.carAmenity.findMany({});
  }

  async findOne(id: number): Promise<CarAmenity | null> {
    return await this.prismaService.carAmenity.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CarAmenityDto): Promise<CarAmenity> {
    return await this.prismaService.carAmenity.create({
      data,
    });
  }

  async update(id: number, data: CarAmenityDto): Promise<CarAmenity> {
    return await this.prismaService.carAmenity.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<CarAmenity> {
    return await this.prismaService.carAmenity.delete({
      where: {
        id,
      },
    });
  }
}
