import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { StockItemsService, StockItem } from '@inv/core';
import { StockItemActions, createStockItemSuccess, searchStockItemSuccess, StockItemSearch, deleteStockItemSuccess, updateStockItemSuccess } from '../actions/stock-item.actions';
import { handleHttpError } from '../actions/http-error.actions';

import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class StockItemEffects {
  constructor(
    private _actions: Actions,
    private _stockItemsService: StockItemsService,
    private _notificationService: NzNotificationService
  ) {}

  createStockItem$ = createEffect(() => this._actions.pipe(
    ofType(StockItemActions.CREATE_STOCK_ITEM),
    mergeMap(item => this._stockItemsService.save(item)
      .pipe(
        map(item => createStockItemSuccess(item)),
        catchError(error => of(handleHttpError(error)))
      )  
    ),
  ));

  createStockItemSuccess$ = createEffect(() => this._actions.pipe(
    ofType(StockItemActions.CREATE_STOCK_ITEM_SUCCESS),
    tap(({ payload }) => {
      this._openNewNotificationSuccess('We successfully created your product item');
    })
  ), { dispatch: false });

  deleteStockItem$ = createEffect(() => this._actions.pipe(
    ofType(StockItemActions.DELETE_STOCK_ITEM),
    mergeMap(({ id }) => this._stockItemsService.delete(id)
      .pipe(
        map((item: StockItem) => deleteStockItemSuccess(item)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  deleteStockItemSuccess$ = createEffect(() => this._actions.pipe(
    ofType(StockItemActions.DELETE_STOCK_ITEM_SUCCESS),
    tap(({ paylaod }) => {
      this._openNewNotificationSuccess('We successfully deleted your stock item');
    })
  ), { dispatch: false });

  searchStockItems$ = createEffect(() => this._actions.pipe(
    ofType(StockItemActions.SEARCH_STOCK_ITEMS),
    mergeMap((search: StockItemSearch) => this._stockItemsService.searchStockItems(search.searchTerm, search.pageable)
      .pipe(
        map(page => searchStockItemSuccess(page)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  updateStockItem$ = createEffect(() => this._actions.pipe(
    ofType(StockItemActions.UPDATE_STOCK_ITEM),
    mergeMap(({ id, item }) => this._stockItemsService.update(id, item)
      .pipe(
        map((item: StockItem) => updateStockItemSuccess(item)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  updateStockItemSuccess$ = createEffect(() => this._actions.pipe(
    ofType(StockItemActions.UPDATE_STOCK_ITEM_SUCCESS),
    tap((item: StockItem) => {
      this._openNewNotificationSuccess('We successfully updated yoru stock item');
    })
  ), { dispatch: false });

  private _openNewNotificationSuccess(message: string): void {
    this._notificationService.blank(
        'Success', message, { nzPlacement: 'topRight', nzDuration: 3000 }
      );
  }
}