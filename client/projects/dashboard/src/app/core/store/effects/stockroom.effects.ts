import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators'; 

import { StockroomActions } from '../actions/stockroom.actions';
import { StockroomsService } from '../../services/stockrooms.service';
import { Stockroom } from '../../models/stockroom.model';
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
        map(stockroom => ({ type: StockroomActions.CREATE_STOCKROOM_SUCCESS, payload: stockroom })),
        catchError(error => of({ type: StockroomActions.CREATE_STOCKROOM_ERROR, payload: error }))
      )
    )
  ));

  createStockroomSuccess$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.CREATE_STOCKROOM_SUCCESS),
    tap(({ payload }) => {
      const stockroom: Stockroom = payload as Stockroom;
      this._openNewNotificationSuccess('We successfully created your new stockroom!');
      this._router.navigate(['/dashboard', 'stockrooms', stockroom.id]);
    })
  ), { dispatch: false });

  createStockroomError$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.CREATE_STOCKROOM_ERROR),
    tap(({ payload }) => {
      this._openNewNotificationError(
        'We encountered an error while creating your stockroom.  Please try again.'
      );
    })
  ), { dispatch: false });

  deleteStockroom$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.DELETE_STOCKROOM),
    mergeMap(({ id }) => this._stockroomsService.delete(id)
      .pipe(
        map(stockroom => ({ type: StockroomActions.DELETE_STOCKROOM_SUCCESS, payload: stockroom })),
        catchError(error => of({ type: StockroomActions.DELETE_STOCKROOM_ERROR, payload: error }))
      )
    )
  ));

  deleteStockroomSuccess$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.DELETE_STOCKROOM_SUCCESS),
    tap(({ payload }) => {
      this._openNewNotificationSuccess(
        'We successfully deleted your stockrom!'
      );
      this._router.navigate(['/dashboard', 'home']);
    })
  ), { dispatch: false });

  deleteStockroomError$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.DELETE_STOCKROOM_ERROR),
    tap(({ payload }) => {
      this._openNewNotificationError(
        'We encountered an error trying to delete your stockroom.  Please try again.'
      );
    })
  ), { dispatch: false });

  getStockrooms$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.GET_STOCKROOMS),
    mergeMap(stockrooms => this._stockroomsService.findAll()
      .pipe(
        map(stockrooms => ({ type: StockroomActions.GET_STOCKROOMS_SUCCESS, payload: stockrooms })),
        catchError(error => {
          this._openNewNotificationError(
            'We encountered an error fetching your stockrooms.  Please try again.'
          );
          return EMPTY;
        })
      )
    )
  ));

  updateStockroom$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.UPDATE_STOCKROOM),
    mergeMap(({ id, stockroom }) => this._stockroomsService.update(id, stockroom)
      .pipe(
        map(stockroom => ({ type: StockroomActions.UPDATE_STOCKROOM_SUCCESS, payload: stockroom })),
        catchError(error => of({ type: StockroomActions.UPDATE_STOCKROOM_ERROR, payload: error }))
      )
    )
  ));

  updateStockroomSuccess$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.UPDATE_STOCKROOM_SUCCESS),
    tap(({ payload }) => {
      this._openNewNotificationSuccess(
        'We successfully updated your stockroom details!'
      );
    })
  ), { dispatch: false });
  
  updateStockroomError$ = createEffect(() => this._actions.pipe(
    ofType(StockroomActions.UPDATE_STOCKROOM_ERROR),
    tap(({ payload }) => {
      this._openNewNotificationError(
        'We encountered an error trying to update your stockroom details.  Please try again.'
      );
    })
  ), { dispatch: false });

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
