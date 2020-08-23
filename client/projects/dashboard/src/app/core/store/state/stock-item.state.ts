import { StockItem, Page, ProductItem } from '@inv/core';

export interface IStockItemState {
  searchResult: Page<StockItem>,
  selectedStockItem: StockItem,
  selectedProductItemFromSearch: ProductItem
}

export const initialStockItemState: IStockItemState = {
  searchResult: null,
  selectedStockItem: null,
  selectedProductItemFromSearch: null 
};
