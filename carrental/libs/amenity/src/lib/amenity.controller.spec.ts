import { Test } from '@nestjs/testing';
import { AmenityController } from './amenity.controller';
import { AmenityService } from './amenity.service';

describe('AmenityController', () => {
  let controller: AmenityController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AmenityService],
      controllers: [AmenityController],
    }).compile();

    controller = module.get(AmenityController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
