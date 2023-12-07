import { Test } from '@nestjs/testing';
import { CarMakeService } from './car-make.service';

describe('CarMakeService', () => {
  let service: CarMakeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CarMakeService],
    }).compile();

    service = module.get(CarMakeService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
