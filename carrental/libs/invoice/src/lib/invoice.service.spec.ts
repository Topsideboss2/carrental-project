import { Test } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [InvoiceService],
    }).compile();

    service = module.get(InvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
