import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavigationSidePanelComponent } from './dashboard-navigation-side-panel.component';

describe('DashboardNavigationSidePanelComponent', () => {
  let component: DashboardNavigationSidePanelComponent;
  let fixture: ComponentFixture<DashboardNavigationSidePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNavigationSidePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNavigationSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
