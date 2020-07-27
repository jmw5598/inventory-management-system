import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ItemConditionsService } from '@inv/core';
import { handleHttpError } from '../actions/http-error.actions';
import { ItemConditionActions, getItemConditionsSuccess } from '../actions/item-condition.actions';

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
        map(conditions => getItemConditionsSuccess(conditions)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}
