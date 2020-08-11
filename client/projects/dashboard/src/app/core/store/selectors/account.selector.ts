import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IAccountState } from '../state/account.state';

export const selectAccountState = createFeatureSelector<IAccountState>("accounts");

export const selectAccountDetails = createSelector(
  selectAccountState,
  (state: IAccountState) => state.details  
);

export const selectAccountStatus = createSelector(
  selectAccountState,
  (state: IAccountState) => state.status
);

export const selectAccountProfile = createSelector(
  selectAccountState,
  (state: IAccountState) => state.profile
);

export const selectRegistrationResult = createSelector(
  selectAccountState,
  (state: IAccountState) => state.registrationResult
);

export const selectPasswordRequestResult = createSelector(
  selectAccountState,
  (state: IAccountState) => state.passwordRequestResetResult
);

export const selectPasswordResetResult = createSelector(
  selectAccountState,
  (state: IAccountState) => state.passwordResetResult
);
