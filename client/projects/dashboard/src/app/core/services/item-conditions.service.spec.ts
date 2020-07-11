import { TestBed } from '@angular/core/testing';

import { ItemConditionsService } from './item-conditions.service';

describe('ItemConditionsService', () => {
  let service: ItemConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
