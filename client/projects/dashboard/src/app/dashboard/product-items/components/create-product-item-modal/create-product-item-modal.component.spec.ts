import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductItemModalComponent } from './create-product-item-modal.component';

describe('CreateProductItemModalComponent', () => {
  let component: CreateProductItemModalComponent;
  let fixture: ComponentFixture<CreateProductItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
