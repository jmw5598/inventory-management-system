import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardLayoutSidePanelService } from '../../dashboard-layout-side-panel.service';
import { DashboardLayoutSidePanelState } from '../../dashboard-layout-side-panel-state.enum';
import { NavigationLink } from '../../models/navigation-link.model';

@Component({
  selector: 'inv-dashboard-navigation-side-panel',
  templateUrl: './dashboard-navigation-side-panel.component.html',
  styleUrls: ['./dashboard-navigation-side-panel.component.scss']
})
export class DashboardNavigationSidePanelComponent implements OnInit {
  @Input()
  public links: NavigationLink[];

  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: DashboardLayoutSidePanelState;
  public SidePanelState = DashboardLayoutSidePanelState;

  constructor(private _sidePanelService: DashboardLayoutSidePanelService) {
    this._subscriptionsSubject$ = new Subject<void>();
  }

  ngOnInit(): void {
    this._sidePanelService.panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: DashboardLayoutSidePanelState) => this.currentPanelState = state);
  }

  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }
}
