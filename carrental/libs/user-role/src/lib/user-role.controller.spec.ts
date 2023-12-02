import { Test } from '@nestjs/testing';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';

describe('UserRoleController', () => {
  let controller: UserRoleController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRoleService],
      controllers: [UserRoleController],
    }).compile();

    controller = module.get(UserRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
