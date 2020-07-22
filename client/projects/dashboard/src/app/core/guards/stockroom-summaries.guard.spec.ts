import { TestBed } from '@angular/core/testing';

import { StockroomSummariesGuard } from './stockroom-summaries.guard';

describe('StockroomSummariesGuard', () => {
  let guard: StockroomSummariesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StockroomSummariesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
