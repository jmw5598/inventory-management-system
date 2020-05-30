import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardLayoutSidePanelService } from './dashboard-layout-side-panel.service';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { DashboardNavigationBarComponent } from './components/dashboard-navigation-bar/dashboard-navigation-bar.component';
import { DashboardNavigationSidePanelComponent } from './components/dashboard-navigation-side-panel/dashboard-navigation-side-panel.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardNavigationBarComponent,
    DashboardNavigationSidePanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    DashboardLayoutSidePanelService 
  ],
  exports: [
    DashboardLayoutComponent,
    DashboardNavigationBarComponent,
    DashboardNavigationSidePanelComponent
  ]
})
export class DashboardLayoutModule { }
