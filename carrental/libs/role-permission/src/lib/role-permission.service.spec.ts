import { Test } from '@nestjs/testing';
import { RolePermissionService } from './role-permission.service';

describe('RolePermissionService', () => {
  let service: RolePermissionService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RolePermissionService],
    }).compile();

    service = module.get(RolePermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
