import { Test, TestingModule } from '@nestjs/testing';
import { ListedItemsController } from './listed-items.controller';

describe('ListedItems Controller', () => {
  let controller: ListedItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListedItemsController],
    }).compile();

    controller = module.get<ListedItemsController>(ListedItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
