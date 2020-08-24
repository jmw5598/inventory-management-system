import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ItemCondition } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { getItemConditions } from '../store/actions/item-condition.actions';
import { selectItemConditions } from '../store/selectors/item-condition.selector';

@Injectable({
  providedIn: 'root'
})
export class ItemConditionsGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {} 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getItemConditionsFromStoreOrApi()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  private _getItemConditionsFromStoreOrApi(): Observable<ItemCondition[]> {
    return this._store.select(selectItemConditions).pipe(
      tap((conditions: ItemCondition[]) => {
        if (!conditions) {
          this._store.dispatch(getItemConditions())
        }
      }),
      filter((conditions: ItemCondition[]) => !!conditions),
      take(1)
    );
  }
}
