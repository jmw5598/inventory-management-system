import { TestBed } from '@angular/core/testing';

import { ItemConditionsGuard } from './item-conditions.guard';

describe('ItemConditionsGuard', () => {
  let guard: ItemConditionsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ItemConditionsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
