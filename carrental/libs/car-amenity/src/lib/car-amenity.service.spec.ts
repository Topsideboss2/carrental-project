import { Test } from '@nestjs/testing';
import { CarAmenityService } from './car-amenity.service';

describe('CarAmenityService', () => {
  let service: CarAmenityService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CarAmenityService],
    }).compile();

    service = module.get(CarAmenityService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
