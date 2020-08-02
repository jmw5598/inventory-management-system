import { StockItem, Page } from '@inv/core';

export interface IStockItemState {
  searchResult: Page<StockItem>
}

export const initialStockItemState: IStockItemState = {
  searchResult: null,
};
