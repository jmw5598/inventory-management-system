import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepStockItemComponent } from './step-stock-item.component';

describe('StepStockItemComponent', () => {
  let component: StepStockItemComponent;
  let fixture: ComponentFixture<StepStockItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepStockItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepStockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
