import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthenticationService, AuthenticatedStatus } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { IAuthenticationState } from '../store/state/authentication.state';
import { selectAuthenticationState } from '../store/selectors/authentication.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private _store: Store<IAppState>,
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) { } 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._store.select(selectAuthenticationState)
      .pipe(
        take(1), 
        map((state: IAuthenticationState) => {
          if (state.authenticatedStatus === AuthenticatedStatus.AUTHENTICATED) {
            return true;
          }
          this._router.navigate(['/auth', 'login']);
          return false;
        }));
  }
}
