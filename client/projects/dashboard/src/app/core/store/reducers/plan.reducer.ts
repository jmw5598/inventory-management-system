import { createReducer, on } from '@ngrx/store';
import { getPlansSuccess } from '../actions/plan.actions';
import { initialPlanState } from '../state/plan.state';

const _planReducer = createReducer(
  initialPlanState,
  on(getPlansSuccess, (state, { payload }) => {
    return {
      ...state,
      plans: payload
    };
  })
);

export function planReducer(state, action) {
  return _planReducer(state, action);
}
