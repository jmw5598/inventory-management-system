import { ItemCondition } from '../../models/item-condition.model';

export interface IItemConditionState {
  itemConditions: ItemCondition[]
};

export const initialItemConditionState: IItemConditionState = {
  itemConditions: []
};
