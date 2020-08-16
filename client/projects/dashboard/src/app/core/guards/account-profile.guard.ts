import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Profile } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { getAccountProfile } from '../store/actions/account.actions';
import { selectAccountProfile } from '../store/selectors/account.selector';

@Injectable({
  providedIn: 'root'
})
export class AccountProfileGuard implements CanActivate {
  constructor(
    private _store: Store<IAppState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getAccountProfileFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _getAccountProfileFromStoreOrApi(): Observable<Profile> {
    return this._store.select(selectAccountProfile).pipe(
      tap((profile: Profile) => {
        if (!profile) {
          this._store.dispatch(getAccountProfile());
        }
      }),
      filter((profile: Profile) => !!profile),
      take(1),
    );
  }
}
