import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AccountActions, registerNewAccountResult, passwordRequestResetResult, passwordResetResult } from '../actions/account.actions';
import { handleHttpError } from '../actions/http-error.actions';
import { AccountsService } from '@inv/core';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class AccountEffects {
  constructor(
    private _actions: Actions,
    private _accountsService: AccountsService
  ) {}

  registerNewAccount$ = createEffect(() => this._actions.pipe(
    ofType(AccountActions.REGISTER_NEW_ACCOUNT),
    mergeMap(registration => this._accountsService.registerNewAccount(registration)
      .pipe(
        map(result => registerNewAccountResult(result)),
        catchError(error => of(registerNewAccountResult({
          status: 'ERROR',
          message: error.error.message
        })))
      )
    )
  ));

  passwordReqeust$ = createEffect(() => this._actions.pipe(
    ofType(AccountActions.PASSWORD_REQUEST_RESET),
    mergeMap(request => this._accountsService.passwordRequestReset(request)
      .pipe(
        map(response => passwordRequestResetResult(response)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  passwordReset$ = createEffect(() => this._actions.pipe(
    ofType(AccountActions.PASSWORD_RESET),
    mergeMap(resetRequest => this._accountsService.passwordReset(resetRequest)
      .pipe(
        map(response => passwordResetResult(response)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}
