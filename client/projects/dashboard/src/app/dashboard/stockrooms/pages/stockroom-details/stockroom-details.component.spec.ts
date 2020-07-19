import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockroomDetailsComponent } from './stockroom-details.component';

describe('StockroomDetailsComponent', () => {
  let component: StockroomDetailsComponent;
  let fixture: ComponentFixture<StockroomDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockroomDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockroomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
