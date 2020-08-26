import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockroomModalComponent } from './create-stockroom-modal.component';

describe('CreateStockroomModalComponent', () => {
  let component: CreateStockroomModalComponent;
  let fixture: ComponentFixture<CreateStockroomModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockroomModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockroomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
