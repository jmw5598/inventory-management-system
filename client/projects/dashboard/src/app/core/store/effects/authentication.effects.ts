import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { AuthenticationActions } from '../actions/authentication.actions';
import { AuthenticationService } from '../../services/authentication.service';

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
        map(user => ({ type: AuthenticationActions.LOGIN_USER_SUCCESS, payload: user })),
        catchError(error => {
          return of({ type: AuthenticationActions.LOGIN_USER_ERROR, payload: error })
        })
      )
    )
  ));
  
  loginUserSuccess$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.LOGIN_USER_SUCCESS),
    tap(({ payload }) => {
      localStorage.setItem('authenticatedUser', JSON.stringify(payload));
      this._router.navigate(['/dashboard', 'home']);
    })
  ), { dispatch: false });

  logoutUser$ = createEffect(() => this._actions.pipe(
    ofType(AuthenticationActions.LOGOUT_USER),
    tap(() => {
      localStorage.removeItem('authenticatedUser');
      this._router.navigate(['/auth', 'login']);
    })
  ), { dispatch: false });
}
