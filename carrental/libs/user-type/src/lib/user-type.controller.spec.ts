import { Test } from '@nestjs/testing';
import { UserTypeController } from './user-type.controller';
import { UserTypeService } from './user-type.service';

describe('UserTypeController', () => {
  let controller: UserTypeController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserTypeService],
      controllers: [UserTypeController],
    }).compile();

    controller = module.get(UserTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
