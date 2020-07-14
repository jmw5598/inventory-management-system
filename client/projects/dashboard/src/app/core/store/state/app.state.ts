import { initialAuthenticationState, IAuthenticationState } from './authentication.state';
import { initialStockroomState, IStockroomState } from './stockroom.state';

export interface IAppState {  
  authentication: IAuthenticationState,
  stockrooms: IStockroomState
}

export const initialAppState: IAppState = {
  authentication: initialAuthenticationState,
  stockrooms: initialStockroomState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
