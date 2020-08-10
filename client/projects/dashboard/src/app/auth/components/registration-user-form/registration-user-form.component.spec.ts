import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationUserFormComponent } from './registration-user-form.component';

describe('RegistrationUserFormComponent', () => {
  let component: RegistrationUserFormComponent;
  let fixture: ComponentFixture<RegistrationUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
