import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IStockItemState } from '../state/stock-item.state';

export const selectStockItemState = createFeatureSelector<IStockItemState>('stockItems');

export const selectStockItemSearchResult = createSelector(
  selectStockItemState,
  (state: IStockItemState) => state.searchResult
);

export const selectSelectedProductItemFromSearch = createSelector(
  selectStockItemState,
  (state: IStockItemState) => state.selectedProductItemFromSearch
);

export const selectCreateStockItemResponseMessage = createSelector(
  selectStockItemState,
  (state: IStockItemState) => state.createStockItemResponseMessage
);
