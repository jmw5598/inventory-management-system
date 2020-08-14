import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Stockroom } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { getStockroomById } from '../store/actions/stockroom.actions';
import { selectSelectedStockroom } from '../store/selectors/stockroom.selector';

@Injectable({
  providedIn: 'root'
})
export class StockroomDetailsGuard implements CanActivate {
  constructor(
    private _store: Store<IAppState>,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const stockroomId: number = +next.paramMap.get('id');
    return this._setSelectedStockroomIfExistElseRedirect(stockroomId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _setSelectedStockroomIfExistElseRedirect(stockroomId: number): Observable<Stockroom> {
    return this._store.select(selectSelectedStockroom).pipe(
      tap((stockroom: Stockroom) => {
        if (!stockroom || stockroom.id !== stockroomId) {
          this._store.dispatch(getStockroomById({ id: stockroomId }))
        }
      }),
      filter((stockroom: Stockroom) => !!stockroom),
      take(1),
    );
  }
}
