import { TestBed } from '@angular/core/testing';

import { PlatformsService } from './platforms.service';

describe('PlatformsService', () => {
  let service: PlatformsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
