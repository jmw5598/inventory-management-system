import { Test, TestingModule } from '@nestjs/testing';
import { InvLoggerService } from './inv-logger.service';

describe('InvLoggerService', () => {
  let service: InvLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvLoggerService],
    }).compile();

    service = module.get<InvLoggerService>(InvLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
