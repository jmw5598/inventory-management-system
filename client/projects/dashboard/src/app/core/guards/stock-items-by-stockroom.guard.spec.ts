import { TestBed } from '@angular/core/testing';

import { StockItemsByStockroomGuard } from './stock-items-by-stockroom.guard';

describe('StockItemsByStockroomGuard', () => {
  let guard: StockItemsByStockroomGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StockItemsByStockroomGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
