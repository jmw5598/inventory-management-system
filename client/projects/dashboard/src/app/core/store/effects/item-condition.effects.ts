import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from "@angular/common/http"

import { HttpErrorActions } from '../actions/http-error.actions';
import { ItemConditionsService } from '../../services/item-conditions.service';
import { ItemConditionActions } from '../actions/item-condition.actions';

import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';


@Injectable()
export class ItemConditionEffects {
  constructor(
    private _actions: Actions,
    private _itemConditionsService: ItemConditionsService  
  ) {}

  getItemConditions$ = createEffect(() => this._actions.pipe(
    ofType(ItemConditionActions.GET_ITEM_CONDITIONS),
    mergeMap(() => this._itemConditionsService.findAll()
      .pipe(
        map(conditions => ({ type: ItemConditionActions.GET_ITEM_CONDITIONS_SUCCESS, payload: conditions })),
        catchError(error => of({ type: HttpErrorActions.HANDLE_HTTP_ERROR, payload: error }))
      )
    )
  ));
}
