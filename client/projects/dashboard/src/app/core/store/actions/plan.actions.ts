import { createAction } from '@ngrx/store';
import { Plan } from '@inv/core';

export enum PlanActions {
  GET_PLANS = '[Plan] Get Plans',
  GET_PLANS_SUCCESS = '[Plan] Get Plans Success'
};

export const getPlans = createAction(
  PlanActions.GET_PLANS
);

export const getPlansSuccess = createAction(
  PlanActions.GET_PLANS_SUCCESS,
  (plans: Plan[]) => ({ payload: plans })
);
