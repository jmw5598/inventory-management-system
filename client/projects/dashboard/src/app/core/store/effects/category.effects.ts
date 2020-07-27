import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CategoriesService } from '@inv/core';
import { HttpErrorActions, handleHttpError } from '../actions/http-error.actions';
import { CategoryActions, getCategoriesSuccess } from '../actions/category.actions';

import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class CategoryEffects {
  constructor(
    private _actions: Actions,
    private _categoriesService: CategoriesService
  ) {}

  getCategories$ = createEffect(() => this._actions.pipe(
    ofType(CategoryActions.GET_CATEGORIES),
    mergeMap(() => this._categoriesService.findAll()
      .pipe(
        map(categories => getCategoriesSuccess(categories)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}
