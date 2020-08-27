import { createReducer, on } from '@ngrx/store';
import { Stockroom, ResponseMessage, ResponseStatus } from '@inv/core';
import { initialStockroomState } from '../state/stockroom.state';
import { 
  createStockroomSuccess, 
  deleteStockroomSuccess, 
  getStockroomsSuccess, 
  setSelectedStockroom, 
  updateStockroomSuccess, 
  getStockroomSummariesSuccess,
  setCreateStockroomResponseMessage,
  setUpdateStockroomResponseMessage
} from '../actions/stockroom.actions'; 

const _stockroomReducer = createReducer(
  initialStockroomState,
  on(getStockroomsSuccess, (state, { payload }) => {
    return {
      ...state,
      stockrooms: payload
    }
  }),
  on(getStockroomSummariesSuccess, (state, { payload }) => {
    return {
      ...state,
      stockroomSummaries: payload
    }
  }),
  on(createStockroomSuccess, (state, { payload }) => {
    const message: ResponseMessage = {
      status: ResponseStatus.SUCCESS,
      message: `We successfully created your stockroom!`
    } as ResponseMessage;
    const stockrooms: Stockroom[] = state.stockrooms.map(s => s);
    stockrooms.push(payload);
    return {
      ...state,
      stockrooms: stockrooms,
      selectedStockroom: payload,
      createStockroomResponseMessage: message
    }
  }),
  on(updateStockroomSuccess, (state, { payload }) => {
    const message: ResponseMessage = { 
      status: ResponseStatus.SUCCESS, 
      message: `We succesfully update your stockroom details!` 
    } as ResponseMessage;
    const stockrooms: Stockroom[] = state.stockrooms.filter(s => s.id !== payload.id);
    stockrooms.push(payload);
    return {
      ...state,
      stockrooms: stockrooms,
      selectedStockroom: state.selectedStockroom,
      updateStockoormResponseMessage: message
    };
  }),
  on(deleteStockroomSuccess, (state, { payload }) => {
    return {
      ...state,
      stockroomSummaries: state.stockroomSummaries.filter(s => s.stockroom.id !== payload.id),
      stockrooms: state.stockrooms.filter(s => s.id !== payload.id),
      selectedStockroom: state.selectedStockroom,
    };
  }),
  on(setSelectedStockroom, (state, { payload }) => {
    return {
      ...state,
      selectedStockroom: payload
    }
  }),
  on(setCreateStockroomResponseMessage, (state, { payload }) => {
    return {
      ...state,
      createStockroomResponseMessage: payload
    }
  }),
  on(setUpdateStockroomResponseMessage, (state, { payload }) => {
    return {
      ...state,
      updateStockoormResponseMessage: payload
    }
  })
);

export function stockroomReducer(state, action) {
  return _stockroomReducer(state, action);   
}
