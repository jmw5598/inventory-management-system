import { Test, TestingModule } from '@nestjs/testing';
import { ItemConditionsController } from './item-conditions.controller';

describe('ItemConditions Controller', () => {
  let controller: ItemConditionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemConditionsController],
    }).compile();

    controller = module.get<ItemConditionsController>(ItemConditionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
