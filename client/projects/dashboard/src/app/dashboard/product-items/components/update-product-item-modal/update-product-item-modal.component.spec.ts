import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductItemModalComponent } from './update-product-item-modal.component';

describe('UpdateProductItemModalComponent', () => {
  let component: UpdateProductItemModalComponent;
  let fixture: ComponentFixture<UpdateProductItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProductItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
