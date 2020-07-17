import { Plan } from '../../models/plan.model'; 

export interface IPlanState {
  plans: Plan[]
};

export const initialPlanState: IPlanState = {
  plans: []
};
