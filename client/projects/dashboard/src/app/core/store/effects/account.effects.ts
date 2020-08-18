import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { handleHttpError } from '../actions/http-error.actions';
import { AccountsService } from '@inv/core';
import { of } from 'rxjs';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
import { 
  AccountActions, 
  registerNewAccountResult, 
  passwordRequestResetResult, 
  passwordResetResult, 
  getAccountDetailsSuccess, 
  getAccountProfileSuccess, 
  updateAccountDetailsSuccess,
  updateAccountProfileSuccess } from '../actions/account.actions';

@Injectable()
export class AccountEffects {
  constructor(
    private _actions: Actions,
    private _accountsService: AccountsService,
    private _notificationService: NzNotificationService
  ) {}

  getAccountDetails$ = createEffect(() => this._actions.pipe(
    ofType(AccountActions.GET_ACCOUNT_DETAILS),
    mergeMap(() => this._accountsService.getAccountDetails()
      .pipe(
        map(details => getAccountDetailsSuccess(details)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  getAccountProfile$ = createEffect(() => this._actions.pipe(
    ofType(AccountActions.GET_ACCOUNT_PROFILE),
    mergeMap(() => this._accountsService.getAccountProfile()
      .pipe(
        map(profile => getAccountProfileSuccess(profile)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

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

  updateAccountDetails$ = createEffect(() => this._actions.pipe(
    ofType(AccountActions.UPDATE_ACCOUNT_DETAILS),
    mergeMap(details => this._accountsService.updateAccountDetails(details)
      .pipe(
        map(response => updateAccountDetailsSuccess(response)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  updateAccountDetailsSuccess$ = createEffect(() => this._actions.pipe(
    ofType(AccountActions.UPDATE_ACCOUNT_DETAILS_SUCCESS),
    tap(({ payload }) => {
      this._openNewNotificationSuccess(`We successfully updated your account details!`);
    })
  ), { dispatch: false });

  updateAccountProfile$ = createEffect(() => this._actions.pipe(
    ofType(AccountActions.UPDATE_ACCOUNT_PROFILE),
    mergeMap(profile => this._accountsService.updateAccountProfile(profile)
      .pipe(
        map(response => updateAccountProfileSuccess(response)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  updateAccountProfileSuccess$ = createEffect(() => this._actions.pipe(
    ofType(AccountActions.UPDATE_ACCOUNT_PROFILE_SUCCESS),
    tap(({ payload }) => {
      this._openNewNotificationSuccess(`We successfully updated your account profile!`);
    })
  ), { dispatch: false });

  private _openNewNotificationSuccess(message: string): void {
    this._notificationService.blank(
        'Success', message, { nzPlacement: 'topRight', nzDuration: 3000 }
      );
  }
}
