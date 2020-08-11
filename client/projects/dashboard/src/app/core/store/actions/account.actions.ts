import { createAction, props } from '@ngrx/store';
import { Account, Profile, Registration, RegistrationResult } from '@inv/core';

export enum AccountActions {
  GET_ACCOUNT_DETAILS = '[Account] Get Account Details',
  GET_ACCOUNT_DETAILS_SUCCESS = '[Account] Get Account Details Success',
  GET_ACCOUNT_PROFILE = '[Account] Get Account Profile',
  GET_ACCOUNT_PROFILE_SUCCESS = '[Account] Get Account Profile Success',
  REGISTER_NEW_ACCOUNT = '[Acount] Register New Account',
  REGISTER_NEW_ACCOUNT_RESULT= '[Account] Register New Account Result',
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
