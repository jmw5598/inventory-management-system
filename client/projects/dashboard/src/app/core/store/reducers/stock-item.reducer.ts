import { createReducer, on } from '@ngrx/store';
import { searchStockItemSuccess, updateStockItemSuccess } from '../actions/stock-item.actions';
import { initialStockItemState } from '../state/stock-item.state';
import { Page, StockItem, ResponseMessage, ResponseStatus } from '@inv/core';

const _stockItemReducer = createReducer(
  initialStockItemState,
  on(searchStockItemSuccess, (state, { payload }) => {
    return {
      ...state,
      searchResult: payload
    }
  }),
  on(updateStockItemSuccess, (state, { payload }) => {
    return {
      ...state,
      selectedStockItem: payload
    }
  })
);

export function stockItemReducer(state, action) {
  return _stockItemReducer(state, action);
}
