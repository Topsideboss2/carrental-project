import { Test } from '@nestjs/testing';
import { CarBodyService } from './car-body.service';

describe('CarBodyService', () => {
  let service: CarBodyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CarBodyService],
    }).compile();

    service = module.get(CarBodyService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
