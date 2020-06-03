import { Component, OnInit } from '@angular/core';
import { DashboardLayoutSidePanelState, DashboardLayoutSidePanelPosition, NavigationLink } from '@inv/core';

@Component({
  selector: 'inv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public sidePanelPosition: DashboardLayoutSidePanelPosition;
  public sidePanelState: DashboardLayoutSidePanelState;
  public links: NavigationLink[];

  constructor() {
    this.sidePanelPosition = DashboardLayoutSidePanelPosition.LEFT;
    this.sidePanelState = DashboardLayoutSidePanelState.OPEN;
  }

  ngOnInit() {
    this.createLinks();
  }

  private createLinks() {
    this.links = [
      new NavigationLink("Home", ['home'], "fas fa-home", true, [
        new NavigationLink("SubHome1", ['home', 'sub1'], "", false),
        new NavigationLink("SubHome2", ['home', 'sub2'], "", false),
        new NavigationLink("SubHome3", ['home', 'sub3'], "", false),
      ], true),
      new NavigationLink("Dashboard", ['dashbaord'], "fas fa-tachometer-alt", true, [
        new NavigationLink("SubDash1", ['home', 'sub1'], "", false),
        new NavigationLink("SubDash2", ['home', 'sub2'], "", false),
        new NavigationLink("SubDash3", ['home', 'sub3'], "", false),
        new NavigationLink("SubDash4", ['home', 'sub4'], "", false),
        new NavigationLink("SubDash5", ['home', 'sub5'], "", false),
      ], true),
      new NavigationLink("Account Info", ['account'], "fas fa-user-circle", true, [
        new NavigationLink("SubAccountInfo1", ['home', 'sub1'], "", false),
        new NavigationLink("SubAccountInfo2", ['home', 'sub2'], "", false),
        new NavigationLink("SubAccountInfo3", ['home', 'sub3'], "", false),
      ], true)
    ]
  }
}
