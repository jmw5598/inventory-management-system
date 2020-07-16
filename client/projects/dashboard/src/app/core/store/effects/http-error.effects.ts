import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { HttpErrorActions } from '../actions/http-error.actions';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpErrorEffects {
  constructor(
    private _actions: Actions,
    private _notificationService: NzNotificationService
  ) {}

  handleHttpError$ = createEffect(() => this._actions.pipe(
    ofType(HttpErrorActions.HANDLE_HTTP_ERROR),
    tap(({ payload }) => {
      const httpError: HttpErrorResponse = payload as HttpErrorResponse;
      console.log(httpError);
      this._openNewNotificationError(httpError.error.message);
    })
  ), { dispatch: false })

  private _openNewNotificationError(message: string): void {
    const notificationMessage: string = `We encounted an error trying your request; ${message}`;    
    this._notificationService.blank(
      'Error', notificationMessage, { nzPlacement: 'topRight', nzDuration: 3000 }
    );
  }
}
