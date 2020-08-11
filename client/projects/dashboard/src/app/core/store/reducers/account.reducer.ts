import { createReducer, on } from '@ngrx/store';
import { initialAccountState } from '../state/account.state';

import { 
  getAccountDetailsSuccess, 
  getAccountProfileSuccess, 
  registerNewAccountResult, 
  passwordRequestResetResult, 
  passwordResetResult 
} from '../actions/account.actions';

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
  }),
  on(passwordRequestResetResult, (state, { payload }) => {
    return {
      ...state,
      passwordRequestResetResult: payload
    }
  }),
  on(passwordResetResult, (state, { payload }) => {
    return {
      ...state,
      passwordResetResult: payload
    }
  })
);

export function accountReducer(state, action) {
  return _accountReducer(state, action);
}
