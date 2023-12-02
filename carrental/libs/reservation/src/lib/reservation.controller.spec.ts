import { Test } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

describe('ReservationController', () => {
  let controller: ReservationController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ReservationService],
      controllers: [ReservationController],
    }).compile();

    controller = module.get(ReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
