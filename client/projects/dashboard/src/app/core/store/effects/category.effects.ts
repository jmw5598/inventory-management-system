import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpErrorActions } from '../actions/http-error.actions';
import { CategoriesService } from '../../services/categories.service';
import { CategoryActions } from '../actions/category.actions';

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
        map(categories => ({ type: CategoryActions.GET_CATEGORIES_SUCCESS, payload: categories })),
        catchError(error => of({ type: HttpErrorActions.HANDLE_HTTP_ERROR, payload: error }))
      )
    )
  ));
}
