import { TestBed } from '@angular/core/testing';

import { ProductItemsService } from './product-items.service';

describe('ProductItemsService', () => {
  let service: ProductItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
