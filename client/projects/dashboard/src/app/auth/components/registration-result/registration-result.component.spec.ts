import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationResultComponent } from './registration-result.component';

describe('RegistrationResultComponent', () => {
  let component: RegistrationResultComponent;
  let fixture: ComponentFixture<RegistrationResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
