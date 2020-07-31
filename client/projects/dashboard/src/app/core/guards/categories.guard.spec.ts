import { TestBed } from '@angular/core/testing';

import { CategoriesGuard } from './categories.guard';

describe('CategoriesGuard', () => {
  let guard: CategoriesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CategoriesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
