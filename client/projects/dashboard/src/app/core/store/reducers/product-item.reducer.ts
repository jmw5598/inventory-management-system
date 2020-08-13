import { createReducer, on } from '@ngrx/store';
import { initialProductItemState } from '../state/product-item.state';
import { Page, ProductItem, ResponseMessage, ResponseStatus } from '@inv/core';
import { 
  searchProductItemsSuccess, 
  getProductItemsByPageSuccess, 
  setSelectedProductItem, 
  deleteProductItemSuccess,
  updateProductItemSuccess,
  createProductItemSuccess,
  setCreateProductItemResponseMessage,
  setUpdateProductItemResponseMessage
} from '../actions/product-item.actions';

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
  on(updateProductItemSuccess, (state, { payload }) => {
    const message: ResponseMessage = { 
      status: ResponseStatus.SUCCESS, 
      message: `We succesfully updated your product item!` 
    } as ResponseMessage;
    return {
      ...state,
      selectedProductItem: payload,
      updateProductItemResponseMessage: message
    }
  }),
  on(createProductItemSuccess, (state, { payload }) => {
    const message: ResponseMessage = {
      status: ResponseStatus.SUCCESS,
      message: `We successfully created your product item!`
    } as ResponseMessage;
    return {
      ...state,
      createProductItemResponseMessage: message
    }
  }),
  on(setUpdateProductItemResponseMessage, (state, { payload }) => {
    return {
      ...state,
      updateProductItemResponseMessage: payload
    }
  }),
  on(setCreateProductItemResponseMessage, (state, { payload }) => {
    return {
      ...state,
      createProductItemResponseMessage: payload
    }
  })
);

export function productItemReducer(state, action) {
  return _productItemReducer(state, action);
}
