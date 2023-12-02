import { Test } from '@nestjs/testing';
import { UserTypeService } from './user-type.service';

describe('UserTypeService', () => {
  let service: UserTypeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserTypeService],
    }).compile();

    service = module.get(UserTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
