import { Account, AccountStatus, Profile, RegistrationResult } from '@inv/core';

export interface IAccountState {
  details: Account,
  status: AccountStatus,
  profile: Profile,
  registrationResult: RegistrationResult
}

export const initialAccountState: IAccountState = {
  details: null,
  status: AccountStatus.INACTIVE,
  profile: null,
  registrationResult: null
}
