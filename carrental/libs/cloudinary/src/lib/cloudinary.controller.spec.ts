import { Test } from '@nestjs/testing';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';

describe('CloudinaryController', () => {
  let controller: CloudinaryController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CloudinaryService],
      controllers: [CloudinaryController],
    }).compile();

    controller = module.get(CloudinaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
