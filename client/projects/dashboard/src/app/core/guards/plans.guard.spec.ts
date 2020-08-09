import { TestBed } from '@angular/core/testing';

import { PlansGuard } from './plans.guard';

describe('PlansGuard', () => {
  let guard: PlansGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlansGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
