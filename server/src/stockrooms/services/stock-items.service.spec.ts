import { Test, TestingModule } from '@nestjs/testing';
import { StockItemsService } from './stock-items.service';

describe('StockItemsService', () => {
  let service: StockItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockItemsService],
    }).compile();

    service = module.get<StockItemsService>(StockItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
