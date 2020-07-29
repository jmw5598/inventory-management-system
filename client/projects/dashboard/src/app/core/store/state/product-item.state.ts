import { ProductItem, Page } from '@inv/core';

export interface IProductItemState {
  searchResult: Page<ProductItem>,
  pageResult: Page<ProductItem>
}

export const initialProductItemState: IProductItemState = {
  searchResult: null,
  pageResult: null
};
