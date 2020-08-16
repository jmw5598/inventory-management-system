import { TestBed } from '@angular/core/testing';

import { AccountDetailsGuard } from './account-details.guard';

describe('AccountDetailsGuard', () => {
  let guard: AccountDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
