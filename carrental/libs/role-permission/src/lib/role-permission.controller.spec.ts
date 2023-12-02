import { Test } from '@nestjs/testing';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';

describe('RolePermissionController', () => {
  let controller: RolePermissionController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RolePermissionService],
      controllers: [RolePermissionController],
    }).compile();

    controller = module.get(RolePermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
