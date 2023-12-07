import { Test } from '@nestjs/testing';
import { CarMediaService } from './car-media.service';

describe('CarMediaService', () => {
  let service: CarMediaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CarMediaService],
    }).compile();

    service = module.get(CarMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
