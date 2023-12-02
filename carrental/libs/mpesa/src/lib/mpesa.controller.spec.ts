import { Test } from '@nestjs/testing';
import { MpesaController } from './mpesa.controller';
import { MpesaService } from './mpesa.service';

describe('MpesaController', () => {
  let controller: MpesaController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MpesaService],
      controllers: [MpesaController],
    }).compile();

    controller = module.get(MpesaController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
