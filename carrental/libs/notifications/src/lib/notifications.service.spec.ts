import { Test } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NotificationsService],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of notifications', () => {
    const notification = service.sendEmailWithPostmark({
      to: '',
      templateId: 0,
      name: '',

    });
    expect(notification).toBe(2);
  });
});
