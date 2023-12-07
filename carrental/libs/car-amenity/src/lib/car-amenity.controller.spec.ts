import { Test } from '@nestjs/testing';
import { CarAmenityController } from './car-amenity.controller';
import { CarAmenityService } from './car-amenity.service';

describe('CarAmenityController', () => {
  let controller: CarAmenityController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CarAmenityService],
      controllers: [CarAmenityController],
    }).compile();

    controller = module.get(CarAmenityController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
