import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepProductItemComponent } from './step-product-item.component';

describe('StepProductItemComponent', () => {
  let component: StepProductItemComponent;
  let fixture: ComponentFixture<StepProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
