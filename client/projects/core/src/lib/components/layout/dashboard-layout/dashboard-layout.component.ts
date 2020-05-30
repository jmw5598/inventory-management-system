import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardLayoutSidePanelPosition } from './dashboard-layout-side-panel-position.enum';
import { DashboardLayoutSidePanelService } from './dashboard-layout-side-panel.service';
import { DashboardLayoutSidePanelState } from './dashboard-layout-side-panel-state.enum';

@Component({
  selector: 'inv-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  @Input()
  public sidePanelPosition: DashboardLayoutSidePanelPosition;

  @Input()
  public sidePanelState: DashboardLayoutSidePanelState;
  
  private _subscriptionsSubject$: Subject<void>;

  constructor(private _sidePanelService: DashboardLayoutSidePanelService) {
    this._subscriptionsSubject$ = new Subject<void>();
    this.sidePanelPosition = DashboardLayoutSidePanelPosition.LEFT
    this.sidePanelState = DashboardLayoutSidePanelState.OPEN;
    this._sidePanelService.changeState(this.sidePanelState);
  }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
    this._sidePanelService
      .panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: DashboardLayoutSidePanelState) => this.sidePanelState = state);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width: number = window.innerWidth;
    if (width < 768) 
      this._sidePanelService.changeState(DashboardLayoutSidePanelState.CLOSE);
    else if (width < 991)
      this._sidePanelService.changeState(DashboardLayoutSidePanelState.COLLAPSE);
    else
      this._sidePanelService.changeState(DashboardLayoutSidePanelState.OPEN);
  }
  
  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }
}
