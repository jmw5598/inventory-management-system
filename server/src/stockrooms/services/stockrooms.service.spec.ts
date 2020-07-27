import { Test, TestingModule } from '@nestjs/testing';
import { StockroomsService } from './stockrooms.service';

describe('StockroomsService', () => {
  let service: StockroomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockroomsService],
    }).compile();

    service = module.get<StockroomsService>(StockroomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
