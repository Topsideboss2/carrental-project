import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '@carrental/prisma';

@Injectable()
export class CarMediaValidationPipe implements PipeTransform<any> {
  constructor(private readonly prismaService: PrismaService) {}
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

    const { media } = value;

    if (media && media.size > MAX_MEDIA_SIZE) {
      throw new BadRequestException('Media size exceeded max limit');
    }

    const ext = media.name.split('.').pop();
    if (!['png', 'jpg', 'mp4'].includes(ext)) {
      throw new BadRequestException('Invalid media type');
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private extractErrorMessages(errors: any[]): string[] {
    const errorMessages: string[] = [];
    errors.forEach((error) => {
      for (const property in error.constraints) {
        if (Object.prototype.hasOwnProperty.call(error.constraints, property)) {
          errorMessages.push(error.constraints[property]);
        }
      }
    });
    return errorMessages;
  }
}

const MAX_MEDIA_SIZE = 1024 * 1024 * 5; // 5MB
