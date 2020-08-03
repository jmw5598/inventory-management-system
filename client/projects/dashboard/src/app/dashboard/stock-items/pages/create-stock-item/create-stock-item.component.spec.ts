import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockItemComponent } from './create-stock-item.component';

describe('CreateStockItemComponent', () => {
  let component: CreateStockItemComponent;
  let fixture: ComponentFixture<CreateStockItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
