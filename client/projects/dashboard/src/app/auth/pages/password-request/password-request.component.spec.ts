import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRequestComponent } from './password-request.component';

describe('PasswordRequestComponent', () => {
  let component: PasswordRequestComponent;
  let fixture: ComponentFixture<PasswordRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
