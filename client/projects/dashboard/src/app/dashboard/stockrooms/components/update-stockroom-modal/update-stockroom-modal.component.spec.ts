import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStockroomModalComponent } from './update-stockroom-modal.component';

describe('UpdateStockroomModalComponent', () => {
  let component: UpdateStockroomModalComponent;
  let fixture: ComponentFixture<UpdateStockroomModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStockroomModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStockroomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
