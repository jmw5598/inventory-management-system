import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMarketingComponent } from './auth-marketing.component';

describe('AuthMarketingComponent', () => {
  let component: AuthMarketingComponent;
  let fixture: ComponentFixture<AuthMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
