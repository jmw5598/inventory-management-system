import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { getStockrooms, setSelectedStockroom } from '../core/store/actions/stockroom.actions';
import { IAppState } from '../core/store/state/app.state';
import { selectCurrentStockrooms } from '../core/store/selectors/stockroom.selector';
import { Stockroom } from '../core/models/stockroom.model';

@Component({
  selector: 'inv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public isCollapsed: boolean = false;
  public stockroomState$: Observable<Stockroom[]>;

  constructor(
    private _store: Store<IAppState>,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.stockroomState$ = this._store.select(selectCurrentStockrooms);
    this._store.dispatch(getStockrooms());
  }

  public onSiderCollapse(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }

  public goToStockroom(stockroom: Stockroom): void {
    this._store.dispatch(setSelectedStockroom(stockroom));
    this._router.navigate(['/dashboard', 'stockrooms', stockroom.id]);
    //console.log('navigated');
  }
}
