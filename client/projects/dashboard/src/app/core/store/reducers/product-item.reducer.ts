import { createReducer, on } from '@ngrx/store';
import { searchProductItemsSuccess, getProductItemsByPageSuccess } from '../actions/product-item.actions';
import { initialProductItemState } from '../state/product-item.state';

const _productItemReducer = createReducer(
  initialProductItemState,
  on(getProductItemsByPageSuccess, (state, { payload }) => {
    return {
      ...state,
      pageResult: payload
    }
  }),
  on(searchProductItemsSuccess, (state, { payload }) => {
    return {
      ...state,
      searchResult: payload
    }
  })
);

export function productItemReducer(state, action) {
  return _productItemReducer(state, action);
}
