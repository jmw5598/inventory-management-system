import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators'
import { Store } from '@ngrx/store';

import { Stockroom } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { getStockrooms } from '../store/actions/stockroom.actions';
import { selectCurrentStockrooms } from '../store/selectors/stockroom.selector';

@Injectable({
  providedIn: 'root'
})
export class StockroomsGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getStockroomsFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _getStockroomsFromStoreOrApi(): Observable<Stockroom[]> {
    return this._store.select(selectCurrentStockrooms).pipe(
      tap((stockrooms: Stockroom[]) => {
        if (!stockrooms || stockrooms.length === 0) {
          this._store.dispatch(getStockrooms())
        }
      }),
      filter((stockrooms: Stockroom[]) => !!stockrooms),
      take(1),
    );
  } 
}
