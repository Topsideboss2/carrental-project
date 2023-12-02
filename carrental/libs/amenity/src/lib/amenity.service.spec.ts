import { Test } from '@nestjs/testing';
import { AmenityService } from './amenity.service';

describe('AmenityService', () => {
  let service: AmenityService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AmenityService],
    }).compile();

    service = module.get(AmenityService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
