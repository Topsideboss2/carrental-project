import { Test } from '@nestjs/testing';
import { CarMakeController } from './car-make.controller';
import { CarMakeService } from './car-make.service';

describe('CarMakeController', () => {
  let controller: CarMakeController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CarMakeService],
      controllers: [CarMakeController],
    }).compile();

    controller = module.get(CarMakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
