import { Test } from '@nestjs/testing';
import { CarMediaController } from './car-media.controller';
import { CarMediaService } from './car-media.service';

describe('CarMediaController', () => {
  let controller: CarMediaController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CarMediaService],
      controllers: [CarMediaController],
    }).compile();

    controller = module.get(CarMediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
