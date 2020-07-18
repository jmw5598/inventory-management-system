import { Injectable, OnDestroy } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppState } from '../store/state/app.state';
import { IAuthenticationState } from '../store/state/authentication.state';
import { AuthenticatedUser } from '../models/authenticated-user.model';
import { AuthenticatedStatus } from '../enums/authenticated-status.enum';
import { selectAuthenticationState } from '../store/selectors/authentication.selector'; 

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor, OnDestroy {
  private _authenticatedState: IAuthenticationState;
  private _authenticatedStateSubscription: Subscription;

  constructor(private _store: Store<IAppState>) {
    this._authenticatedStateSubscription = this._store.select(selectAuthenticationState)
      .subscribe(state => this._authenticatedState = state);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._authenticatedState.authenticatedStatus === AuthenticatedStatus.AUTHENTICATED) {
      const prefix: string = this._authenticatedState.authenticatedUser.prefix;
      const accessToken: string = this._authenticatedState.authenticatedUser.accessToken;
      const authorizationHeaderValue: string = `${prefix} ${accessToken}`;
      request = request.clone({
        setHeaders: {
          Authorization: authorizationHeaderValue 
        }
      });
    }
    return next.handle(request);
  }

  ngOnDestroy() {
    if (this._authenticatedStateSubscription)
      this._authenticatedStateSubscription.unsubscribe();
  }
}
