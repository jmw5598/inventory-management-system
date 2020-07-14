import { createAction, props } from '@ngrx/store';
import { AuthenticatedUser } from '../../models/authenticated-user.model';
import { UserCredentials } from '../../models/user-credentials.model';
import { HttpErrorResponse } from '@angular/common/http';

export enum AuthenticationActions {
  LOGIN_USER = '[Authentication] Login User',
  LOGIN_USER_SUCCESS = '[Authentication] Login User Success',
  LOGIN_USER_ERROR = '[Authentication] Login User Error',
  LOGOUT_USER = '[Authentication] Logout User',
  LOGOUT_USER_SUCCESS = '[Authentication] Logout User Success'
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
