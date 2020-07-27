import { Injectable, OnDestroy } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, skip } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthenticatedStatus, AuthenticatedUser } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { IAuthenticationState } from '../store/state/authentication.state';
import { selectAuthenticationState, selectAuthenticatedUser } from '../store/selectors/authentication.selector';
import { refreshToken } from '../store/actions/authentication.actions';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor, OnDestroy {
  private _authenticatedState: IAuthenticationState;
  private _authenticatedStateSubscription: Subscription;
  private _isRefreshing = false;
  private _refreshTokenSubject: BehaviorSubject<AuthenticatedUser> = new BehaviorSubject<AuthenticatedUser>(null);

  constructor(private _store: Store<IAppState>) {
    this._authenticatedStateSubscription = this._store.select(selectAuthenticationState)
      .subscribe(state => this._authenticatedState = state);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._authenticatedState.authenticatedStatus === AuthenticatedStatus.AUTHENTICATED) {
      const accessToken: string = this._authenticatedState.authenticatedUser.accessToken;
      request = this._addAuthorizationHeader(request, accessToken);
    }
    
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.includes('auth/login')) {
        return this._handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private _addAuthorizationHeader(request: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> {
    const prefix: string = this._authenticatedState.authenticatedUser.prefix;
    const authorizationHeaderValue: string = `${prefix} ${accessToken}`;
    return request.clone({
      setHeaders: {
        Authorization: authorizationHeaderValue 
      }
    });
  }
  
  private _handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject.next(null);
      this._store.dispatch(refreshToken());
      
      return this._store.select(selectAuthenticatedUser).pipe(
        skip(1),
        switchMap((user: AuthenticatedUser) => {
          this._isRefreshing = false;
          this._refreshTokenSubject.next(user);
          return next.handle(
            this._addAuthorizationHeader(request, user.accessToken));
        })
      );
    } else {
      return this._refreshTokenSubject.pipe(
        filter((user: AuthenticatedUser) => user != null),
        take(1),
        switchMap((user: AuthenticatedUser) => next.handle(
          this._addAuthorizationHeader(request, user.accessToken))
        ));
    }
  }

  ngOnDestroy() {
    if (this._authenticatedStateSubscription) {
      this._authenticatedStateSubscription.unsubscribe();
    }
  }
}
