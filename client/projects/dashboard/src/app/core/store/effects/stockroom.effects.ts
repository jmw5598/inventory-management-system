import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators'; 

import { StockroomsService, Stockroom } from '@inv/core';

import { handleHttpError } from '../actions/http-error.actions';
import { StockroomActions, getStockroomSummariesSuccess, getStockroomsSuccess, 
  createStockroomSuccess, deleteStockroomSuccess, updateStockroomSuccess, setSelectedStockroom 
} from '../actions/stockroom.actions';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class StockroomEffects {
  constructor(
    private _actions: Actions,
    private _notificationService: NzNotificationService,
    private _stockroomsService: StockroomsService,
    private _router: Router
  ) { }

  createStockroom$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.CREATE_STOCKROOM),
    mergeMap(stockroom => this._stockroomsService.save(stockroom)
      .pipe(
        map(stockroom => createStockroomSuccess(stockroom)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  deleteStockroom$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.DELETE_STOCKROOM),
    mergeMap(({ id }) => this._stockroomsService.delete(id)
      .pipe(
        map(stockroom => deleteStockroomSuccess(stockroom)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  deleteStockroomSuccess$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.DELETE_STOCKROOM_SUCCESS),
    tap(({ payload }) => {
      this._openNewNotificationSuccess(
        'We successfully deleted your stockrom!'
      );
    })
  ), { dispatch: false });

  getStockrooms$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.GET_STOCKROOMS),
    mergeMap(stockrooms => this._stockroomsService.findAll()
      .pipe(
        map(stockrooms => getStockroomsSuccess(stockrooms)),
        catchError(error => {
          this._openNewNotificationError(
            'We encountered an error fetching your stockrooms.  Please try again.'
          );
          return EMPTY;
        })
      )
    )
  ));

  getStockroomSummaries$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.GET_STOCKROOM_SUMMARIES),
    mergeMap(() => this._stockroomsService.getStockroomSummaries()
      .pipe(
        map(summaries => getStockroomSummariesSuccess(summaries)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  getStockroomById$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.GET_STOCKROOM_BY_ID),
    mergeMap(({ id}) => this._stockroomsService.findOne(id)
      .pipe(
        map((stockroom: Stockroom) => setSelectedStockroom(stockroom)),
        catchError(error => of(handleHttpError(error)))
      ))
  ));

  updateStockroom$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.UPDATE_STOCKROOM),
    mergeMap(({ id, stockroom }) => this._stockroomsService.update(id, stockroom)
      .pipe(
        map(stockroom => updateStockroomSuccess(stockroom)),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  private _openNewNotificationError(message: string): void {
    this._notificationService.blank(
        'Error', message, { nzPlacement: 'topRight', nzDuration: 3000 }
      );
  }

  private _openNewNotificationSuccess(message: string): void {
    this._notificationService.blank(
        'Success', message, { nzPlacement: 'topRight', nzDuration: 3000 }
      );
  }
}
