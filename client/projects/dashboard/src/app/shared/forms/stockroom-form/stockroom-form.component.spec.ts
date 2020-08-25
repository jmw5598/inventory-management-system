import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockroomFormComponent } from './stockroom-form.component';

describe('StockroomFormComponent', () => {
  let component: StockroomFormComponent;
  let fixture: ComponentFixture<StockroomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockroomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockroomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
