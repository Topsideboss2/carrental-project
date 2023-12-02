import { Test } from '@nestjs/testing';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

describe('InvoiceController', () => {
  let controller: InvoiceController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [InvoiceService],
      controllers: [InvoiceController],
    }).compile();

    controller = module.get(InvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
