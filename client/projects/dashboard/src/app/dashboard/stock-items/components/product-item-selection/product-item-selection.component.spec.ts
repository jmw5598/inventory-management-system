import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemSelectionComponent } from './product-item-selection.component';

describe('ProductItemSelectionComponent', () => {
  let component: ProductItemSelectionComponent;
  let fixture: ComponentFixture<ProductItemSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
