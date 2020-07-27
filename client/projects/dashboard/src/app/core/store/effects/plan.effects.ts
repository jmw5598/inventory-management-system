import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PlansService } from '@inv/core';
import { handleHttpError } from '../actions/http-error.actions';
import { PlanActions, getPlansSuccess } from '../actions/plan.actions';

import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class PlanEffects {
  constructor(
    private _actions: Actions,
    private _plansService: PlansService
  ) {}

  getPlans$ = createEffect(() => this._actions.pipe(
    ofType(PlanActions.GET_PLANS),
    mergeMap(() => this._plansService.findAll()
      .pipe(
        map(plans => getPlansSuccess(plans)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}
