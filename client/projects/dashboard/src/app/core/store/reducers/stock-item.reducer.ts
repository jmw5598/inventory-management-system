import { createReducer, on } from '@ngrx/store';
import { initialStockItemState } from '../state/stock-item.state';
import { 
  searchStockItemSuccess, 
  updateStockItemSuccess, 
  setSelectedProductItemFromSearch } from '../actions/stock-item.actions';

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
  }),
  on(setSelectedProductItemFromSearch, (state, { payload }) => {
    
    return {
      ...state,
      selectedProductItemFromSearch: payload
    }
  })
);

export function stockItemReducer(state, action) {
  return _stockItemReducer(state, action);
}
