import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpErrorActions, handleHttpError } from '../actions/http-error.actions';
import { PlatformsService } from '../../services/platforms.service';
import { PlatformActions, getPlatformsSuccess } from '../actions/platform.actions';

import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators'; 

@Injectable()
export class PlatformEffects {
  constructor(
    private _actions: Actions,
    private _platformsService: PlatformsService
  ) {}

  getPlatforms$ = createEffect(() => this._actions.pipe(
    ofType(PlatformActions.GET_PLATFORMS),
    mergeMap(() => this._platformsService.findAll()
      .pipe(
        map(platforms => getPlatformsSuccess(platforms)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}