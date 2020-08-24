import { ItemCondition } from '@inv/core';

export interface IItemConditionState {
  itemConditions: ItemCondition[]
};

export const initialItemConditionState: IItemConditionState = {
  itemConditions: null
};
