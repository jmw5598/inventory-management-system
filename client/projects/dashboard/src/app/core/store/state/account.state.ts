import { Account, AccountStatus, Profile } from '@inv/core';

export interface IAccountState {
  details: Account,
  status: AccountStatus,
  profile: Profile,
}

export const initialAccountState: IAccountState = {
  details: null,
  status: AccountStatus.INACTIVE,
  profile: null,
}
