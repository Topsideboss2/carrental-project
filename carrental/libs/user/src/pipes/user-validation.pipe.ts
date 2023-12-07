import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '@lawfirm/prisma';

@Injectable()
export class UserValidationPipe implements PipeTransform<any> {
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

    const { email, phoneNumber } = value;

    // Check for existing user with the provided email or phone number
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'User already exists.'
      );
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
