import { TestBed } from '@angular/core/testing';

import { ProductItemDetailsGuard } from './product-item-details.guard';

describe('ProductItemDetailsGuard', () => {
  let guard: ProductItemDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductItemDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
