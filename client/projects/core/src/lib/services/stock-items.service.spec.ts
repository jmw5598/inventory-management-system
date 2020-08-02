import { TestBed } from '@angular/core/testing';

import { StockItemsService } from './stock-items.service';

describe('StockItemsService', () => {
  let service: StockItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
