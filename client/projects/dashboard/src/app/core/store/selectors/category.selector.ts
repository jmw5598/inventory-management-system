import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICategoryState } from '../state/category.state';

export const selectCategoryState = createFeatureSelector<ICategoryState>('categories');

export const selectCategories = createSelector(
  selectCategoryState,
  (state: ICategoryState) => state.categories
);
