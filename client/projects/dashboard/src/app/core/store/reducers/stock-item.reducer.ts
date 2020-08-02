import { createReducer, on } from '@ngrx/store';
import { searchStockItemSuccess } from '../actions/stock-item.actions';
import { initialStockItemState } from '../state/stock-item.state';
import { Page, StockItem } from '@inv/core';

const _stockItemReducer = createReducer(
  initialStockItemState,
  on(searchStockItemSuccess, (state, { payload }) => {
    return {
      ...state,
      searchResult: payload
    }
  })
);

export function stockItemReducer(state, action) {
  return _stockItemReducer(state, action);
}
