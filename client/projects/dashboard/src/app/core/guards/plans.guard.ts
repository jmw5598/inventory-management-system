import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Plan } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { getPlans } from '../store/actions/plan.actions';
import { selectPlans } from '../store/selectors/plan.selector';

@Injectable({
  providedIn: 'root'
})
export class PlansGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getPlansFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _getPlansFromStoreOrApi(): Observable<Plan[]> {
    return this._store.select(selectPlans).pipe(
      tap((plans: Plan[]) => {
        if (!plans) {
          this._store.dispatch(getPlans())
        }
      }),
      filter((plans: Plan[]) => !!plans),
      take(1)
    );
  }
}
