import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpErrorActions } from '../actions/http-error.actions';
import { AccountActions } from '../actions/account.actions';
import { AccountsService } from '../../services/accounts.service';

import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class AccountEffects {
  constructor(
    private _actions: Actions,
    private _accountsService: AccountsService
  ) {}

  getAccountDetails$ = createEffect(() => this._actions.pipe(
    
  ));

  getAccountProfile$ = createEffect(() => this._actions.pipe(

  ));
}
