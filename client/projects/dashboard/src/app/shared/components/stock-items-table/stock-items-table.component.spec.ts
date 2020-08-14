import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockItemsTableComponent } from './stock-items-table.component';

describe('StockItemsTableComponent', () => {
  let component: StockItemsTableComponent;
  let fixture: ComponentFixture<StockItemsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockItemsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
