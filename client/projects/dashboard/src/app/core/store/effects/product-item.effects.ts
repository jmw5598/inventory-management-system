import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ProductItemsService } from '@inv/core';
import { handleHttpError } from '../actions/http-error.actions';
import { ProductItemActions, createProductItemSuccess, getProductItemsByPageSuccess, ProductItemSearch, searchProductItemsSuccess } from '../actions/product-item.actions';

import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';


@Injectable()
export class ProductItemEffects {
  constructor(
    private _actions: Actions,
    private _productItemsService: ProductItemsService
  ) {}

  createProductItem$ = createEffect(() => this._actions.pipe(
    ofType(ProductItemActions.CREATE_PRODUCT_ITEM),
    mergeMap(product => this._productItemsService.save(product)
      .pipe(
        map(product => createProductItemSuccess(product)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  getProductItemsByPage$ = createEffect(() => this._actions.pipe(
    ofType(ProductItemActions.GET_PRODUCT_ITEMS_BY_PAGE),
    mergeMap(pageable => this._productItemsService.getProductItemsByPage(pageable)
      .pipe(
        map(page => getProductItemsByPageSuccess(page)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  searchProductItems$ = createEffect(() => this._actions.pipe(
    ofType(ProductItemActions.SEARCH_PRODUCT_ITEMS),
    mergeMap((search: ProductItemSearch) => this._productItemsService.searchProductItems(search.searchTerm, search.pageable)
      .pipe(
        map(page => searchProductItemsSuccess(page)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}