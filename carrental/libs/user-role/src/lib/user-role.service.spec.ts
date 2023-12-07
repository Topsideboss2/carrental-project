import { Test } from '@nestjs/testing';
import { UserRoleService } from './user-role.service';

describe('UserRoleService', () => {
  let service: UserRoleService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRoleService],
    }).compile();

    service = module.get(UserRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
