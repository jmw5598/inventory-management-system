import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IAuthenticationState } from '../state/authentication.state';

export const selectAuthenticationState = createFeatureSelector<IAuthenticationState>('authentication');

export const selectAuthenticatedUser = createSelector(
  selectAuthenticationState,
  (state: IAuthenticationState) => state.authenticatedUser
);

export const selectAuthenticatedStatus = createSelector(
  selectAuthenticationState,
  (state: IAuthenticationState) => state.authenticatedStatus
);

export const selectAuthenticationErrorMessage = createSelector(
  selectAuthenticationState,
  (state: IAuthenticationState) => state.errorMessage
);
