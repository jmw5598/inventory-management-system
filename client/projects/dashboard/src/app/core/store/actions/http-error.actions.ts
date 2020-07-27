import { HttpErrorResponse } from '@angular/common/http';
import { createAction } from '@ngrx/store';

export enum HttpErrorActions {
  HANDLE_HTTP_ERROR = '[Http Error] Handle Http Error'
};

export const handleHttpError = createAction(
  HttpErrorActions.HANDLE_HTTP_ERROR,
  (error: HttpErrorResponse) => ({ payload: error })
);
