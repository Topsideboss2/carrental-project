import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtService,
        AuthService
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
