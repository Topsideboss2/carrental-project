import { Test } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

describe('ReportController', () => {
  let controller: ReportController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ReportService],
      controllers: [ReportController],
    }).compile();

    controller = module.get(ReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
