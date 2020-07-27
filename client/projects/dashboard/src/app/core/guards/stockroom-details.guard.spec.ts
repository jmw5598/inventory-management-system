import { TestBed } from '@angular/core/testing';

import { StockroomDetailsGuard } from './stockroom-details.guard';

describe('StockroomDetailsGuard', () => {
  let guard: StockroomDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StockroomDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
