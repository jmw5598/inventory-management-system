import { Account, AccountStatus, Profile, RegistrationResult, ResponseMessage } from '@inv/core';

export interface IAccountState {
  details: Account,
  status: AccountStatus,
  profile: Profile,
  registrationResult: RegistrationResult,
  passwordRequestResetResult: ResponseMessage,
  passwordResetResult: ResponseMessage
}

export const initialAccountState: IAccountState = {
  details: null,
  status: AccountStatus.INACTIVE,
  profile: null,
  registrationResult: null,
  passwordRequestResetResult: null,
  passwordResetResult: null
}
