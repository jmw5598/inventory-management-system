import { Plan } from '@inv/core'; 

export interface IPlanState {
  plans: Plan[]
};

export const initialPlanState: IPlanState = {
  plans: null
};
