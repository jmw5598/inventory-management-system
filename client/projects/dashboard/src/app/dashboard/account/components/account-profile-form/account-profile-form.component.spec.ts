import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileFormComponent } from './account-profile-form.component';

describe('AccountProfileFormComponent', () => {
  let component: AccountProfileFormComponent;
  let fixture: ComponentFixture<AccountProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountProfileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
