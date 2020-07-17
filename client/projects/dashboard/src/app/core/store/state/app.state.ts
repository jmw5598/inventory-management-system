import { initialAuthenticationState, IAuthenticationState } from './authentication.state';
import { initialPlatformState, IPlatformState } from './platform.state';
import { initialStockroomState, IStockroomState } from './stockroom.state';
import { initialItemConditionState, IItemConditionState } from './item-condition.state';
import { initialCategoryState, ICategoryState } from './category.state';
import { initialPlanState, IPlanState } from './plan.state';

export interface IAppState {  
  authentication: IAuthenticationState,
  stockrooms: IStockroomState,
  platforms: IPlatformState,
  itemConditions: IItemConditionState,
  categories: ICategoryState,
  plans: IPlanState,
}

export const initialAppState: IAppState = {
  authentication: initialAuthenticationState,
  stockrooms: initialStockroomState,
  platforms: initialPlatformState,
  itemConditions: initialItemConditionState,
  categories: initialCategoryState,
  plans: initialPlanState,
}

export function getInitialState(): IAppState {
  return initialAppState;
}
