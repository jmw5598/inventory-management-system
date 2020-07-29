import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IProductItemState } from '../state/product-item.state';

export const selectProductItemState = createFeatureSelector<IProductItemState>('productItems');

export const selectProductItemSearchResult = createSelector(
  selectProductItemState,
  (state: IProductItemState) => state.searchResult
);

export const selectProductItemPageResult = createSelector(
  selectProductItemState,
  (state: IProductItemState) => state.pageResult
);
