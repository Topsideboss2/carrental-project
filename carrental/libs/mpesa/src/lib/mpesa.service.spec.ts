import { Test } from '@nestjs/testing';
import { MpesaService } from './mpesa.service';

describe('MpesaService', () => {
  let service: MpesaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MpesaService],
    }).compile();

    service = module.get(MpesaService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
