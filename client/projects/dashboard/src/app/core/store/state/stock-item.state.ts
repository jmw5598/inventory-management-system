import { StockItem, Page, ProductItem, ResponseMessage } from '@inv/core';

export interface IStockItemState {
  searchResult: Page<StockItem>,
  selectedStockItem: StockItem,
  selectedProductItemFromSearch: ProductItem,
  createStockItemResponseMessage: ResponseMessage
}

export const initialStockItemState: IStockItemState = {
  searchResult: null,
  selectedStockItem: null,
  selectedProductItemFromSearch: null,
  createStockItemResponseMessage: null
};
