import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IItemConditionState } from '../state/item-condition.state';

export const selectItemConditionState = createFeatureSelector<IItemConditionState>('itemConditions');

export const selectItemConditions = createSelector(
  selectItemConditionState,
  (state: IItemConditionState) => state.itemConditions
);
