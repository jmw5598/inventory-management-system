import { createAction, props } from '@ngrx/store';
import { Account, Profile, Registration, RegistrationResult } from '@inv/core';
import { PasswordRequestReset, PasswordReset, ResponseMessage } from '@inv/core';

export enum AccountActions {
  GET_ACCOUNT_DETAILS = '[Account] Get Account Details',
  GET_ACCOUNT_DETAILS_SUCCESS = '[Account] Get Account Details Success',
  GET_ACCOUNT_PROFILE = '[Account] Get Account Profile',
  GET_ACCOUNT_PROFILE_SUCCESS = '[Account] Get Account Profile Success',
  PASSWORD_REQUEST_RESET = '[Account] Password Request Reset',
  PASSWORD_REQUEST_RESET_RESULT = '[Account] Password Request Reset Result',
  PASSWORD_RESET = '[Account] Password Reset',
  PASSWORD_RESET_RESULT = '[Account] Password Reset Result',
  REGISTER_NEW_ACCOUNT = '[Acount] Register New Account',
  REGISTER_NEW_ACCOUNT_RESULT= '[Account] Register New Account Result',
  UPDATE_ACCOUNT_DETAILS = '[Account] Update Account Details',
  UPDATE_ACCOUNT_DETAILS_SUCCESS = '[Account] Update Account Details Success',
  UPDATE_ACCOUNT_PROFILE = '[Account] Update Account Profile',
  UPDATE_ACCOUNT_PROFILE_SUCCESS = '[Account] Update Account Profile Success',
};

export const getAccountDetails = createAction(
  AccountActions.GET_ACCOUNT_DETAILS
);

export const getAccountDetailsSuccess = createAction(
  AccountActions.GET_ACCOUNT_DETAILS_SUCCESS,
  (account: Account) => ({ payload: account })
);

export const getAccountProfile = createAction(
  AccountActions.GET_ACCOUNT_PROFILE
);

export const getAccountProfileSuccess = createAction(
  AccountActions.GET_ACCOUNT_PROFILE_SUCCESS,
  (profile: Profile) => ({ payload: profile })
);

export const registerNewAccount = createAction(
  AccountActions.REGISTER_NEW_ACCOUNT,
  props<Registration>()
);

export const registerNewAccountResult = createAction(
  AccountActions.REGISTER_NEW_ACCOUNT_RESULT,
  (result: RegistrationResult) => ({ payload: result })
);

export const passwordRequestReset = createAction(
  AccountActions.PASSWORD_REQUEST_RESET,
  props<PasswordRequestReset>()
);

export const passwordRequestResetResult = createAction(
  AccountActions.PASSWORD_REQUEST_RESET_RESULT,
  (result: ResponseMessage) => ({ payload: result })
);

export const passwordReset = createAction(
  AccountActions.PASSWORD_RESET,
  props<PasswordReset>()
);

export const passwordResetResult = createAction(
  AccountActions.PASSWORD_RESET_RESULT,
  (result: ResponseMessage) => ({ payload: result })
);

export const updateAccountDetails = createAction(
  AccountActions.UPDATE_ACCOUNT_DETAILS,
  props<Account>()
);

export const updateAccountDetailsSuccess = createAction(
  AccountActions.UPDATE_ACCOUNT_DETAILS_SUCCESS,
  (account: Account) => ({ payload: account })
);

export const updateAccountProfile = createAction(
  AccountActions.UPDATE_ACCOUNT_PROFILE,
  props<Profile>()
);

export const updateAccountProfileSuccess = createAction(
  AccountActions.UPDATE_ACCOUNT_PROFILE_SUCCESS,
  (profile: Profile) => ({ payload: profile })
);
