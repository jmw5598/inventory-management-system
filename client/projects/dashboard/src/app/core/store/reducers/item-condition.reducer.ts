import { createReducer, on } from '@ngrx/store';
import { getItemConditionsSuccess } from '../actions/item-condition.actions';
import { initialItemConditionState } from '../state/item-condition.state';

const _itemConditionReducer = createReducer(
  initialItemConditionState,
  on(getItemConditionsSuccess, (state, { payload }) => {
    return {
      ...state,
      itemConditions: payload
    }
  })
);

export function itemConditionReducer(state, action) {
  return _itemConditionReducer(state, action);
}
