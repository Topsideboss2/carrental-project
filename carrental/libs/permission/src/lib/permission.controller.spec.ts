import { Test } from '@nestjs/testing';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

describe('PermissionController', () => {
  let controller: PermissionController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PermissionService],
      controllers: [PermissionController],
    }).compile();

    controller = module.get(PermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
