import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, withLatestFrom } from 'rxjs/operators';

import { AuthenticationActions, loginUserSuccess, loginUserError, logoutUser, refreshTokenSuccess } from '../actions/authentication.actions';
import { AuthenticationService, AuthenticatedUser } from '@inv/core';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private _actions: Actions,
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) { }

  loginUser$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.LOGIN_USER),
    mergeMap(credentials => this._authenticationService.authenticateUser(credentials)
      .pipe(
        map(user => loginUserSuccess(user)),
        catchError(error => of(loginUserError(error)))
      )
    )
  ));

  logoutUser$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.LOGOUT_USER),
    tap(() => {
      this._authenticationService.logoutUser();
      this._router.navigate(['/auth', 'login']);
    })
  ), { dispatch: false });

  refreshToken$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.REFRESH_TOKEN),
    mergeMap(() => {
      const authenticatedUser: AuthenticatedUser = this._authenticationService.getStoredAuthenticatedUser();
      const accessToken: string = authenticatedUser.accessToken;
      const refreshToken: string = authenticatedUser.refreshToken;
      return this._authenticationService.refreshToken(accessToken, refreshToken)
        .pipe(
          map(user => refreshTokenSuccess(user)),
          catchError(error => of(logoutUser()))
        )
    })
  ));
}

