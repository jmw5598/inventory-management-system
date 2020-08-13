import { Injectable } from '@angular/core';
import { Router }  from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ProductItemsService, ProductItem } from '@inv/core';
import { handleHttpError } from '../actions/http-error.actions';
import { ProductItemActions, createProductItemSuccess, deleteProductItemSuccess, getProductItemsByPageSuccess, ProductItemSearch, searchProductItemsSuccess, setSelectedProductItem, updateProductItemSuccess } from '../actions/product-item.actions';

import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable()
export class ProductItemEffects {
  constructor(
    private _actions: Actions,
    private _notificationService: NzNotificationService,
    private _productItemsService: ProductItemsService,
    private _router: Router
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

  deleteProductItem$ = createEffect(() => this._actions.pipe(
    ofType(ProductItemActions.DELETE_PRODUCT_ITEM),
    mergeMap(({ id }) => this._productItemsService.delete(id)
      .pipe(
        map(product => deleteProductItemSuccess(product)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  deleteProductItemSuccess$ = createEffect(() => this._actions.pipe(
    ofType(ProductItemActions.DELETE_PRODUCT_TIEM_SUCCESS),
    tap(({ payload }) => {
      this._openNewNotificationSuccess('We successfully deleted your product item');
    }) 
  ), { dispatch: false });

  getProductItemsByPage$ = createEffect(() => this._actions.pipe(
    ofType(ProductItemActions.GET_PRODUCT_ITEMS_BY_PAGE),
    mergeMap(pageable => this._productItemsService.getProductItemsByPage(pageable)
      .pipe(
        map(page => getProductItemsByPageSuccess(page)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  getProductItemById$ = createEffect(() => this._actions.pipe(
    ofType(ProductItemActions.GET_PRODUCT_ITEM_BY_ID),
    mergeMap((({ id }) => this._productItemsService.findOne(id)
      .pipe(
        map((product: ProductItem) => setSelectedProductItem(product)),
        catchError(error => of(handleHttpError(error)))
      )))
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

  updateProductItem$ = createEffect(() => this._actions.pipe(
    ofType(ProductItemActions.UPDATE_PRODUCT_ITEM),
    mergeMap(({ id, product }) => this._productItemsService.update(id, product)
      .pipe(
        map(product => updateProductItemSuccess(product)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  private _openNewNotificationSuccess(message: string): void {
    this._notificationService.blank(
        'Success', message, { nzPlacement: 'topRight', nzDuration: 3000 }
      );
  }
}