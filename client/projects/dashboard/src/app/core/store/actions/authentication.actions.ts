import { createAction, props } from '@ngrx/store';
import { AuthenticatedUser, UserCredentials } from '@inv/core';
import { HttpErrorResponse } from '@angular/common/http';

export enum AuthenticationActions {
  LOGIN_USER = '[Authentication] Login User',
  LOGIN_USER_SUCCESS = '[Authentication] Login User Success',
  LOGIN_USER_ERROR = '[Authentication] Login User Error',
  LOGOUT_USER = '[Authentication] Logout User',
  LOGOUT_USER_SUCCESS = '[Authentication] Logout User Success',
  REFRESH_TOKEN = '[Authentication] Refresh Token',
  REFRESH_TOKEN_SUCCESS = '[Authentication] Refresh Token Success',
  SET_AUTHENTICATED_USER = '[Authentication] Set Authenticated User'
}

export const loginUser = createAction(
  AuthenticationActions.LOGIN_USER,
  props<UserCredentials>()
);

export const loginUserSuccess = createAction(
  AuthenticationActions.LOGIN_USER_SUCCESS,
  (user: AuthenticatedUser) => ({ payload: user })
);

export const loginUserError = createAction(
  AuthenticationActions.LOGIN_USER_ERROR,
  (error: HttpErrorResponse) => ({ payload: error })
);

export const logoutUser = createAction(
  AuthenticationActions.LOGOUT_USER 
);

export const logoutUserSuccess = createAction(
  AuthenticationActions.LOGOUT_USER_SUCCESS
);

export const refreshToken = createAction(
  AuthenticationActions.REFRESH_TOKEN
);

export const refreshTokenSuccess = createAction(
  AuthenticationActions.REFRESH_TOKEN_SUCCESS,
  (user: AuthenticatedUser) => ({ payload: user })
);

export const setAuthenticatedUser = createAction(
  AuthenticationActions.SET_AUTHENTICATED_USER,
  (user: AuthenticatedUser) => ({ payload: user })
);
