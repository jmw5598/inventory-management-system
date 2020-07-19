import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStockroomsComponent } from './manage-stockrooms.component';

describe('ManageStockroomsComponent', () => {
  let component: ManageStockroomsComponent;
  let fixture: ComponentFixture<ManageStockroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStockroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStockroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
