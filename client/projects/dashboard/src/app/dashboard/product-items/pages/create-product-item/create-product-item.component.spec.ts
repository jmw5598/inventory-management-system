import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductItemComponent } from './create-product-item.component';

describe('CreateProductItemComponent', () => {
  let component: CreateProductItemComponent;
  let fixture: ComponentFixture<CreateProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
