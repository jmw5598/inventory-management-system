import { createAction, props } from '@ngrx/store';
import { Stockroom, StockroomSummary } from '@inv/core';
import { ResponseMessage } from 'projects/core/src/public-api';

export enum StockroomActions {
  CREATE_STOCKROOM = '[Stockroom] Create Stockroom',
  CREATE_STOCKROOM_SUCCESS = '[Stockroom] Create Stockroom Success',
  CREATE_STOCKROOM_RESPONSE_MESSAGE = '[Stockroom] Create Stockroom Response Message',
  DELETE_STOCKROOM = '[Stockroom] Delete Stockroom',
  DELETE_STOCKROOM_SUCCESS = '[Stockroom] Delete Stockroom Success',
  GET_STOCKROOMS = '[Stockroom] Get Stockrooms',
  GET_STOCKROOMS_SUCCESS = '[Stockroom] Get Stockrooms Success',
  GET_STOCKROOM_SUMMARIES = '[Stockroom] Get Stockroom Summaries',
  GET_STOCKROOM_SUMMARIES_SUCCESS = '[Stockroom] Get Stockroom Summaries Success',
  GET_STOCKROOM_BY_ID = '[Stockroom] Get Stockroom By Id',
  SET_SELECTED_STOCKROOM = '[Stockroom] Set Selected Stockroom',
  UPDATE_STOCKROOM = '[Stockroom] Update Stockroom',
  UPDATE_STOCKROOM_SUCCESS = '[Stockroom] Update Stockroom Success',
  UPDATE_STOCKROOM_RESPONSE_MESSAGE = '[Stockroom] Update Stockroom Response Message'
};

export const createStockroom = createAction(
  StockroomActions.CREATE_STOCKROOM,
  props<Stockroom>()
);

export const createStockroomSuccess = createAction(
  StockroomActions.CREATE_STOCKROOM_SUCCESS,
  (stockroom: Stockroom) => ({ payload: stockroom })
);

export const setCreateStockroomResponseMessage = createAction(
  StockroomActions.CREATE_STOCKROOM_RESPONSE_MESSAGE,
  (message: ResponseMessage) => ({ payload: message })
);

export const deleteStockroom = createAction(
  StockroomActions.DELETE_STOCKROOM,
  props<{ id: number }>()
);

export const deleteStockroomSuccess = createAction(
  StockroomActions.DELETE_STOCKROOM_SUCCESS,
  (stockroom: Stockroom) => ({ payload: stockroom })
);

export const getStockrooms = createAction(
  StockroomActions.GET_STOCKROOMS
);

export const getStockroomsSuccess = createAction(
  StockroomActions.GET_STOCKROOMS_SUCCESS,
  (stockrooms: Stockroom[]) => ({ payload: stockrooms })
);

export const getStockroomSummaries = createAction(
  StockroomActions.GET_STOCKROOM_SUMMARIES
)

export const getStockroomSummariesSuccess = createAction(
  StockroomActions.GET_STOCKROOM_SUMMARIES_SUCCESS,
  (summaries: StockroomSummary[]) => ({ payload: summaries })
)

export const getStockroomById = createAction(
  StockroomActions.GET_STOCKROOM_BY_ID,
  props<{ id: number }>()
);

export const setSelectedStockroom = createAction(
  StockroomActions.SET_SELECTED_STOCKROOM,
  (stockroom: Stockroom) => ({ payload: stockroom })
);

export const updateStockroom = createAction(
  StockroomActions.UPDATE_STOCKROOM,
  props<{ id: number, stockroom: Stockroom }>()
);

export const updateStockroomSuccess = createAction(
  StockroomActions.UPDATE_STOCKROOM_SUCCESS,
  (stockroom: Stockroom) => ({ payload: stockroom })
);

export const setUpdateStockroomResponseMessage = createAction(
  StockroomActions.UPDATE_STOCKROOM_RESPONSE_MESSAGE,
  (message: ResponseMessage) => ({ payload: message })
);
