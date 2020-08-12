import { ActionReducer } from '@ngrx/store';
import { AuthenticationActions } from '../actions/authentication.actions';

export function resetStateOnLogout(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthenticationActions.LOGOUT_USER) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
