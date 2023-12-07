import { PrismaService } from '@carrental/prisma';
import { Injectable } from '@nestjs/common';
import { Amenity } from '@prisma/client';
import { AmenityDto } from '../dto/amenity.dto';

@Injectable()
export class AmenityService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async findAll(): Promise<Amenity[]> {
    return await this.prismaService.amenity.findMany({});
  }

  async findOne(id: number): Promise<Amenity | null> {
    return await this.prismaService.amenity.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: AmenityDto): Promise<Amenity> {
    return await this.prismaService.amenity.create({
      data,
    });
  }

  async update(id: number, data: AmenityDto): Promise<Amenity> {
    return await this.prismaService.amenity.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Amenity> {
    return await this.prismaService.amenity.delete({
      where: {
        id,
      },
    });
  }
}
