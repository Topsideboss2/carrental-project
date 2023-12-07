import { Test } from '@nestjs/testing';
import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ReportService],
    }).compile();

    service = module.get(ReportService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
