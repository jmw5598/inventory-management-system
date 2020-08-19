import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddressFormComponent } from './account-address-form.component';

describe('AccountAddressFormComponent', () => {
  let component: AccountAddressFormComponent;
  let fixture: ComponentFixture<AccountAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAddressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
