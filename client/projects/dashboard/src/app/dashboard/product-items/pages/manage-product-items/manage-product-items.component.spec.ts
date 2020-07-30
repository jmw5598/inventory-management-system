import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductItemsComponent } from './manage-product-items.component';

describe('ManageProductItemsComponent', () => {
  let component: ManageProductItemsComponent;
  let fixture: ComponentFixture<ManageProductItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProductItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
