import { TestBed } from '@angular/core/testing';

import { ListedItemsService } from './listed-items.service';

describe('ListedItemsService', () => {
  let service: ListedItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListedItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
