import { initialAuthenticationState, IAuthenticationState } from './authentication.state';
import { initialPlatformState, IPlatformState } from './platform.state';
import { initialStockroomState, IStockroomState } from './stockroom.state';
import { initialItemConditionState, IItemConditionState } from './item-condition.state';
import { initialCategoryState, ICategoryState } from './category.state';

export interface IAppState {  
  authentication: IAuthenticationState,
  stockrooms: IStockroomState,
  platforms: IPlatformState,
  itemConditions: IItemConditionState,
  categories: ICategoryState,
}

export const initialAppState: IAppState = {
  authentication: initialAuthenticationState,
  stockrooms: initialStockroomState,
  platforms: initialPlatformState,
  itemConditions: initialItemConditionState,
  categories: initialCategoryState,
}

export function getInitialState(): IAppState {
  return initialAppState;
}
