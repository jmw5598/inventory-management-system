import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPlanState } from '../state/plan.state';

export const selectPlanState = createFeatureSelector<IPlanState>("plans");

export const selectPlans = createSelector(
  selectPlanState,
  (state: IPlanState) => state.plans
);
