import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpErrorActions } from '../actions/http-error.actions';
import { PlansService } from '../../services/plans.service'; 
import { PlanActions } from '../actions/plan.actions';

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
        map(plans => ({ type: PlanActions.GET_PLANS_SUCCESS, payload: plans })),
        catchError(error => of({ type: HttpErrorActions.HANDLE_HTTP_ERROR, payload: error }))
      )
    )
  ));
}
