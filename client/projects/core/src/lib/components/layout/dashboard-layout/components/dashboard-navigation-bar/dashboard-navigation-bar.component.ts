import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardLayoutSidePanelService } from '../../dashboard-layout-side-panel.service';
import { DashboardLayoutSidePanelState } from '../../dashboard-layout-side-panel-state.enum';

@Component({
  selector: 'inv-dashboard-navigation-bar',
  templateUrl: './dashboard-navigation-bar.component.html',
  styleUrls: ['./dashboard-navigation-bar.component.scss']
})
export class DashboardNavigationBarComponent implements OnInit, OnDestroy {
  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: DashboardLayoutSidePanelState;

  constructor(private _sidePanelService: DashboardLayoutSidePanelService) {
    this._subscriptionsSubject$ = new Subject<void>();
  }

  ngOnInit(): void {
    this._sidePanelService
      .panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: DashboardLayoutSidePanelState) => this.currentPanelState = state);
  }

  public handleToggleSidePanel(): void {
    if (this.currentPanelState === DashboardLayoutSidePanelState.CLOSE 
        || this.currentPanelState === DashboardLayoutSidePanelState.COLLAPSE) {
      this._sidePanelService.changeState(DashboardLayoutSidePanelState.OPEN);
    } else {
      this._sidePanelService.changeState(DashboardLayoutSidePanelState.CLOSE);
    }
  }

  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }
}
