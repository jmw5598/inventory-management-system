import { createReducer, on } from '@ngrx/store';
import { searchProductItemsSuccess, getProductItemsByPageSuccess, setSelectedProductItem, deleteProductItemSuccess } from '../actions/product-item.actions';
import { initialProductItemState } from '../state/product-item.state';
import { Page, ProductItem } from '@inv/core';

const _productItemReducer = createReducer(
  initialProductItemState,
  on(getProductItemsByPageSuccess, (state, { payload }) => {
    return {
      ...state,
      pageResult: payload
    }
  }),
  on(deleteProductItemSuccess, (state, { payload }) => {
    const searchResult: Page<ProductItem> = { ...state.searchResult };
    const elements: ProductItem[] = searchResult.elements.filter(e => e.id !== payload.id);
    searchResult.elements = elements;
    return {
      ...state,
      searchResult: searchResult
    }
  }),
  on(setSelectedProductItem, (state, { payload }) => {
    return {
      ...state,
      selectedProductItem: payload
    }
  }),
  on(searchProductItemsSuccess, (state, { payload }) => {
    return {
      ...state,
      searchResult: payload
    }
  }),
);

export function productItemReducer(state, action) {
  return _productItemReducer(state, action);
}
