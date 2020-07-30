import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductItemComponent } from './update-product-item.component';

describe('UpdateProductItemComponent', () => {
  let component: UpdateProductItemComponent;
  let fixture: ComponentFixture<UpdateProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
