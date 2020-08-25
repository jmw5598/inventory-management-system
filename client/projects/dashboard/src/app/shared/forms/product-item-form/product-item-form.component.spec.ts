import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemFormComponent } from './product-item-form.component';

describe('ProductItemFormComponent', () => {
  let component: ProductItemFormComponent;
  let fixture: ComponentFixture<ProductItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
