import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockItemModalComponent } from './create-stock-item-modal.component';

describe('CreateStockItemModalComponent', () => {
  let component: CreateStockItemModalComponent;
  let fixture: ComponentFixture<CreateStockItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
