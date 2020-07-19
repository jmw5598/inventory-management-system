import { TestBed } from '@angular/core/testing';

import { StockroomsGuard } from './stockrooms.guard';

describe('StockroomsGuard', () => {
  let guard: StockroomsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StockroomsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
