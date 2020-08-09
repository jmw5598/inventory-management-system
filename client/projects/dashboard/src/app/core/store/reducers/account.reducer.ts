import { createReducer, on } from '@ngrx/store';
import { getAccountDetailsSuccess, getAccountProfileSuccess, registerNewAccountResult } from '../actions/account.actions';
import { initialAccountState } from '../state/account.state';

const _accountReducer = createReducer(
  initialAccountState,
  on(getAccountDetailsSuccess, (state, { payload }) => {
    return {}
  }),
  on(getAccountProfileSuccess, (state, { payload }) => {
    return {}
  }),
  on(registerNewAccountResult, (state, { payload }) => {
    return {
      ...state,
      registrationResult: payload
    }
  })
);

export function accountReducer(state, action) {
  return _accountReducer(state, action);
}
