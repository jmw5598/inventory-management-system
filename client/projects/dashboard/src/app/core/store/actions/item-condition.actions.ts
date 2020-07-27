import { createAction } from '@ngrx/store';
import { ItemCondition } from '@inv/core';

export enum ItemConditionActions {
  GET_ITEM_CONDITIONS = '[Item Condition] Get Item Conditions',
  GET_ITEM_CONDITIONS_SUCCESS = '[Item Condition] Get Item Conditions Success'
}

export const getItemConditions = createAction(
  ItemConditionActions.GET_ITEM_CONDITIONS
);

export const getItemConditionsSuccess = createAction(
  ItemConditionActions.GET_ITEM_CONDITIONS_SUCCESS,
  (conditions: ItemCondition[]) => ({ payload: conditions })
);
