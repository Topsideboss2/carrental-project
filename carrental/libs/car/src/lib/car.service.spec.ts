import { Test } from '@nestjs/testing';
import { CarService } from './car.service';

describe('CarService', () => {
  let service: CarService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CarService],
    }).compile();

    service = module.get(CarService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
