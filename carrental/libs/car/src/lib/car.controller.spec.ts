import { Test } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CarService } from './car.service';

describe('CarController', () => {
  let controller: CarController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CarService],
      controllers: [CarController],
    }).compile();

    controller = module.get(CarController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
