import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationProfileFormComponent } from './registration-profile-form.component';

describe('RegistrationProfileFormComponent', () => {
  let component: RegistrationProfileFormComponent;
  let fixture: ComponentFixture<RegistrationProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationProfileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
