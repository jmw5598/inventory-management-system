import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockroomComponent } from './edit-stockroom.component';

describe('EditStockroomComponent', () => {
  let component: EditStockroomComponent;
  let fixture: ComponentFixture<EditStockroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStockroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStockroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
