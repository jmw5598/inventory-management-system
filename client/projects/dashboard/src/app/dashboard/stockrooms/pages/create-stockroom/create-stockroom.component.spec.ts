import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockroomComponent } from './create-stockroom.component';

describe('CreateStockroomComponent', () => {
  let component: CreateStockroomComponent;
  let fixture: ComponentFixture<CreateStockroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
