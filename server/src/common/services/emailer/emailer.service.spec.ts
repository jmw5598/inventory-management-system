import { Test, TestingModule } from '@nestjs/testing';
import { EmailerService } from './emailer.service';

describe('EmailerService', () => {
  let service: EmailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailerService],
    }).compile();

    service = module.get<EmailerService>(EmailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
