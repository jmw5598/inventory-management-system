import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAddressFormComponent } from './registration-address-form.component';

describe('RegistrationAddressFormComponent', () => {
  let component: RegistrationAddressFormComponent;
  let fixture: ComponentFixture<RegistrationAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAddressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
