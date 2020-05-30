import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavigationBarComponent } from './dashboard-navigation-bar.component';

describe('DashboardNavigationBarComponent', () => {
  let component: DashboardNavigationBarComponent;
  let fixture: ComponentFixture<DashboardNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
