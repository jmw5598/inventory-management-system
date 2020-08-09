import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AccountActions, registerNewAccountResult } from '../actions/account.actions';
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
          message: error.message
        })))
      )
    )
  ));
}
