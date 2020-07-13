import { TestBed } from '@angular/core/testing';

import { AuthenitcationService } from './authenitcation.service';

describe('AuthenitcationService', () => {
  let service: AuthenitcationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenitcationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
