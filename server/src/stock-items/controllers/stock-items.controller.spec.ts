import { Test, TestingModule } from '@nestjs/testing';
import { StockItemsController } from './stock-items.controller';

describe('StockItems Controller', () => {
  let controller: StockItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockItemsController],
    }).compile();

    controller = module.get<StockItemsController>(StockItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
