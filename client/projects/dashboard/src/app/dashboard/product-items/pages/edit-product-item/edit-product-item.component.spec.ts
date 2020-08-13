import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductItemComponent } from './edit-product-item.component';

describe('EditProductItemComponent', () => {
  let component: EditProductItemComponent;
  let fixture: ComponentFixture<EditProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
