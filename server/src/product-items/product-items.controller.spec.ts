import { Test, TestingModule } from '@nestjs/testing';
import { ProductItemsController } from './product-items.controller';

describe('Product Items Controller', () => {
  let controller: ProductItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductItemsController],
    }).compile();

    controller = module.get<ProductItemsController>(ProductItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
