import { Test } from '@nestjs/testing';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ReservationService],
    }).compile();

    service = module.get(ReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
