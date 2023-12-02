import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '@carrental/prisma';

@Injectable()
export class AmenityValidationPipe implements PipeTransform<any> {

  constructor(private readonly prismaService: PrismaService) {
  }
  async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      // Extract specific validation errors and return them
      const errorMessages = this.extractErrorMessages(errors);
      throw new BadRequestException(errorMessages);
    }

    const { name } = value;
    const amenity = await this.prismaService.amenity.findFirst({
      where: {
        name
      }
    })
    if (amenity) {
      throw new BadRequestException('Amenity with the provided name already exists.');
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private extractErrorMessages(errors: any[]): string[] {
    const errorMessages: string[] = [];
    errors.forEach(error => {
      for (const property in error.constraints) {
        if (Object.prototype.hasOwnProperty.call(error.constraints, property)) {
          errorMessages.push(error.constraints[property]);
        }
      }
    });
    return errorMessages;
  }
}
