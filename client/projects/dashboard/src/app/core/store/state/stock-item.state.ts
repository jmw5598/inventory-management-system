import { StockItem, Page } from '@inv/core';

export interface IStockItemState {
  searchResult: Page<StockItem>,
  selectedStockItem: StockItem
}

export const initialStockItemState: IStockItemState = {
  searchResult: null,
  selectedStockItem: null
};
