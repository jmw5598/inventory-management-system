import { TestBed } from '@angular/core/testing';

import { AccountProfileGuard } from './account-profile.guard';

describe('AccountProfileGuard', () => {
  let guard: AccountProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
