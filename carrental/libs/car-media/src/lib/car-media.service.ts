import { PrismaService } from '@carrental/prisma';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CarMedia } from '@prisma/client';
import { CarMediaDto } from '../dto/car-media.dto';

@Injectable()
export class CarMediaService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<CarMedia[]> {
    return await this.prismaService.carMedia.findMany({
      include: {
        car: true,
      },
    });
  }

  async findOne(id: number): Promise<CarMedia | null> {
    return await this.prismaService.carMedia.findUnique({
      where: {
        id,
      },
      include: {
        car: true,
      },
    });
  }

  async findSingleCarMedia(id: number): Promise<CarMedia[]> {
    return await this.prismaService.carMedia.findMany({
      where: {
        carId: id,
      },
      include: {
        car: true,
      },
    });
  }

  async create(data: CarMediaDto): Promise<CarMedia> {
    try {
      return await this.prismaService.carMedia.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error as string)
    }

  }

  async update(id: number, data: CarMediaDto): Promise<CarMedia> {
    return await this.prismaService.carMedia.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<CarMedia> {
    return await this.prismaService.carMedia.delete({
      where: {
        id,
      },
    });
  }
}
