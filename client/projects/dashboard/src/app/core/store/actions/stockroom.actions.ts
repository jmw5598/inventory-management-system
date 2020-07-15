import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Stockroom } from '../../models/stockroom.model';

export enum StockroomActions {
  CREATE_STOCKROOM = '[Stockroom] Create Stockroom',
  CREATE_STOCKROOM_SUCCESS = '[Stockroom] Create Stockroom Success',
  CREATE_STOCKROOM_ERROR = '[Stockroom] Create Stockroom Error',
  DELETE_STOCKROOM = '[Stockroom] Delete Stockroom',
  DELETE_STOCKROOM_SUCCESS = '[Stockroom] Delete Stockroom Success',
  DELETE_STOCKROOM_ERROR = '[Srockr] Delete Stockroom Error',
  GET_STOCKROOMS = '[Stockroom] Get Stockrooms',
  GET_STOCKROOMS_SUCCESS = '[Stockroom] Get Stockrooms Success',
  GET_STOCKROOM_DETAILS = '[Stockroom] Get Stockroom Details',
  SET_SELECTED_STOCKROOM = '[Stockroom] Set Selected Stockroom',
  UPDATE_STOCKROOM = '[Stockroom] Update Stockroom',
  UPDATE_STOCKROOM_SUCCESS = '[Stockroom] Update Stockroom Success',
  UPDATE_STOCKROOM_ERROR = '[Stockroom] Update Stockroom Error'
};

export const createStockroom = createAction(
  StockroomActions.CREATE_STOCKROOM,
  props<Stockroom>()
);

export const createStockroomSuccess = createAction(
  StockroomActions.CREATE_STOCKROOM_SUCCESS,
  (stockroom: Stockroom) => ({ payload: stockroom })
);

export const createStockroomError = createAction(
  StockroomActions.CREATE_STOCKROOM_ERROR,
  (error: HttpErrorResponse) => ({ payload: error })
);

export const deleteStockroom = createAction(
  StockroomActions.DELETE_STOCKROOM,
  props<{ id: number }>()
);

export const deleteStockroomSuccess = createAction(
  StockroomActions.DELETE_STOCKROOM_SUCCESS,
  (stockroom: Stockroom) => ({ payload: stockroom })
);

export const deleteStockroomError = createAction(
  StockroomActions.DELETE_STOCKROOM_ERROR,
  (error: HttpErrorResponse) => ({ payload: error })
);

export const getStockrooms = createAction(
  StockroomActions.GET_STOCKROOMS
);

export const getStockroomsSuccess = createAction(
  StockroomActions.GET_STOCKROOMS_SUCCESS,
  (stockrooms: Stockroom[]) => ({ payload: stockrooms })
);

export const setSelectedStockroom = createAction(
  StockroomActions.SET_SELECTED_STOCKROOM,
  props<Stockroom>()
);

export const updateStockroom = createAction(
  StockroomActions.UPDATE_STOCKROOM,
  props<{ id: number, stockroom: Stockroom }>()
);

export const updateStockroomSuccess = createAction(
  StockroomActions.UPDATE_STOCKROOM_SUCCESS,
  (stockroom: Stockroom) => ({ payload: stockroom })
);

export const updateStockroomError = createAction(
  StockroomActions.UPDATE_STOCKROOM_ERROR,
  (error: HttpErrorResponse) => ({ payload: error })
);
