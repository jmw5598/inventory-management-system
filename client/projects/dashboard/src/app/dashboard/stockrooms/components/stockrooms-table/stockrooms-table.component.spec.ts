import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockroomsTableComponent } from './stockrooms-table.component';

describe('StockroomsTableComponent', () => {
  let component: StockroomsTableComponent;
  let fixture: ComponentFixture<StockroomsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockroomsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockroomsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
