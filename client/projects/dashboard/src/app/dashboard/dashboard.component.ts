import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Stockroom } from '@inv/core';
import { IAppState } from '../core/store/state/app.state';
import { selectCurrentStockrooms } from '../core/store/selectors/stockroom.selector';
import { fadeAnimation } from '../shared/animations/fade-in-out.animation';

@Component({
  selector: 'inv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeAnimation]
})
export class DashboardComponent implements OnInit {
  public isCollapsed: boolean = false;
  public stockroomState$: Observable<Stockroom[]>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.stockroomState$ = this._store.select(selectCurrentStockrooms);
  }

  public onSiderCollapse(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }
}
