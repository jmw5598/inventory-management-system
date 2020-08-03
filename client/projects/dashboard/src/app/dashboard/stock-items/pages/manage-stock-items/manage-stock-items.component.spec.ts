import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStockItemsComponent } from './manage-stock-items.component';

describe('ManageStockItemsComponent', () => {
  let component: ManageStockItemsComponent;
  let fixture: ComponentFixture<ManageStockItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStockItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStockItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
