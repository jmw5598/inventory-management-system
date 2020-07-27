import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { StockroomSummary } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { getStockroomSummaries } from '../store/actions/stockroom.actions';
import { selectStockroomSummaries } from '../store/selectors/stockroom.selector';

@Injectable({
  providedIn: 'root'
})
export class StockroomSummariesGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getStockroomSummariesFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _getStockroomSummariesFromStoreOrApi(): Observable<StockroomSummary[]> {
    return this._store.select(selectStockroomSummaries).pipe(
      tap((summaries: StockroomSummary[]) => {
        if (!summaries || summaries.length === 0) {
          this._store.dispatch(getStockroomSummaries());
        }
      }),
      filter((summaries: StockroomSummary[]) => !!summaries),
      take(1)
    );
  }
}
