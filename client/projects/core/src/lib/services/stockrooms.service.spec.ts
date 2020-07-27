import { TestBed } from '@angular/core/testing';

import { StockroomsService } from './stockrooms.service';

describe('StockroomsService', () => {
  let service: StockroomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockroomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
