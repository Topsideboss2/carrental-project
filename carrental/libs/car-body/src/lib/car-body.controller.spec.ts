import { Test } from '@nestjs/testing';
import { CarBodyController } from './car-body.controller';
import { CarBodyService } from './car-body.service';

describe('CarBodyController', () => {
  let controller: CarBodyController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CarBodyService],
      controllers: [CarBodyController],
    }).compile();

    controller = module.get(CarBodyController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
