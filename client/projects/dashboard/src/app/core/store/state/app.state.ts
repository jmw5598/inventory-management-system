import { initialAuthenticationState, IAuthenticationState } from './authentication.state';
import { initialPlatformState, IPlatformState } from './platform.state';
import { initialStockroomState, IStockroomState } from './stockroom.state';
import { IItemConditionState, initialItemConditionState } from './item-condition.state';

export interface IAppState {  
  authentication: IAuthenticationState,
  stockrooms: IStockroomState,
  platforms: IPlatformState,
  itemConditions: IItemConditionState,
}

export const initialAppState: IAppState = {
  authentication: initialAuthenticationState,
  stockrooms: initialStockroomState,
  platforms: initialPlatformState,
  itemConditions: initialItemConditionState,
}

export function getInitialState(): IAppState {
  return initialAppState;
}
