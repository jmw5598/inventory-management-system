import { createReducer, on } from '@ngrx/store';
import { initialAccountState } from '../state/account.state';

import { 
  getAccountDetailsSuccess, 
  getAccountProfileSuccess, 
  registerNewAccountResult, 
  passwordRequestResetResult, 
  passwordResetResult, 
  updateAccountDetailsSuccess,
  updateAccountProfileSuccess
} from '../actions/account.actions';

const _accountReducer = createReducer(
  initialAccountState,
  on(getAccountDetailsSuccess, (state, { payload }) => {
    return {
      ...state,
      details: payload
    }
  }),
  on(getAccountProfileSuccess, (state, { payload }) => {
    return {
      ...state,
      profile: payload
    }
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
  }),
  on(updateAccountDetailsSuccess, (state, { payload }) => {
    return {
      ...state,
      details: payload
    }
  }),
  on(updateAccountProfileSuccess, (state, { payload }) => {
    return {
      ...state,
      profile: payload 
    }
  })
);

export function accountReducer(state, action) {
  return _accountReducer(state, action);
}
