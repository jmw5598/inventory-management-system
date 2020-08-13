import { ProductItem, Page, ResponseMessage } from '@inv/core';

export interface IProductItemState {
  searchResult: Page<ProductItem>,
  pageResult: Page<ProductItem>,
  selectedProductItem: ProductItem,
  createProductItemResponseMessage: ResponseMessage,
  updateProductItemResponseMessage: ResponseMessage
}

export const initialProductItemState: IProductItemState = {
  searchResult: null,
  pageResult: null,
  selectedProductItem: null,
  createProductItemResponseMessage: null,
  updateProductItemResponseMessage: null
};
