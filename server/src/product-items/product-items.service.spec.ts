import { Test, TestingModule } from '@nestjs/testing';
import { ProductItemsService } from './product-items.service';

describe('ProductItemsService', () => {
  let service: ProductItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductItemsService],
    }).compile();

    service = module.get<ProductItemsService>(ProductItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
