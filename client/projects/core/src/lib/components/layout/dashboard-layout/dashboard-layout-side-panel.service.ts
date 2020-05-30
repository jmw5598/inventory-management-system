import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardLayoutSidePanelState } from './dashboard-layout-side-panel-state.enum';

@Injectable()
export class DashboardLayoutSidePanelService {
  private _panelState: DashboardLayoutSidePanelState;
  private _panelStateSource: BehaviorSubject<DashboardLayoutSidePanelState>;
  public panelStateChanges: Observable<DashboardLayoutSidePanelState>;

  constructor() {
    this._panelState = DashboardLayoutSidePanelState.OPEN;
    this._panelStateSource = new BehaviorSubject<DashboardLayoutSidePanelState>(this._panelState);
    this.panelStateChanges = this._panelStateSource.asObservable();
  }

  public changeState(state: DashboardLayoutSidePanelState): void {
    this._panelState = state;
    this._panelStateSource.next(this._panelState);
  }
}
