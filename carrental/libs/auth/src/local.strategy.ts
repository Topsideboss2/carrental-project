import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthService } from './lib/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<string | User> {
    const user = await this.authService.validateUserCredentials(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials, user not found');
    }
    return user;
  }

}
