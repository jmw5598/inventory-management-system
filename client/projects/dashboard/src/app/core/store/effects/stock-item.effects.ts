import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { StockItemsService } from '@inv/core';
import { StockItemActions, createStockItemSuccess, searchStockItemSuccess, StockItemSearch } from '../actions/stock-item.actions';
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

  searchStockItems$ = createEffect(() => this._actions.pipe(
    ofType(StockItemActions.SEARCH_STOCK_ITEMS),
    mergeMap((search: StockItemSearch) => this._stockItemsService.searchStockItems(search.searchTerm, search.pageable)
      .pipe(
        map(page => searchStockItemSuccess(page)),
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