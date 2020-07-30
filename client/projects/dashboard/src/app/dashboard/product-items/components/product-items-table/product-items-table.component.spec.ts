import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemsTableComponent } from './product-items-table.component';

describe('ProductItemsTableComponent', () => {
  let component: ProductItemsTableComponent;
  let fixture: ComponentFixture<ProductItemsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
