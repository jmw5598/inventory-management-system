import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticatedStatus } from '../enums/authenticated-status.enum';
import { AuthenticatedUser } from '../models/authenticated-user.model'; 
import { UserCredentials } from '../models/user-credentials.model';
import { UserDetails } from '../models/user-details.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _baseUrl: string;
  private _authenticatedUser: AuthenticatedUser;
  private _authenticatedUserSoruce: BehaviorSubject<AuthenticatedUser>;
  private _authenticatedStatus: AuthenticatedStatus;
  private _authenticatedStatusSource: BehaviorSubject<AuthenticatedStatus>;

  constructor(private _http: HttpClient) {
    this._baseUrl = environment.auth.base;
    this._authenticatedStatus = AuthenticatedStatus.UNAUTHENTICATED;
    this._authenticatedUser = null;

    // @@@ TODO - Logic to constructor authentication state from localstorage on reload

    this._authenticatedUserSoruce = new BehaviorSubject<AuthenticatedUser>(this._authenticatedUser);
    this._authenticatedStatusSource = new BehaviorSubject<AuthenticatedStatus>(this._authenticatedStatus);
  }

  public onAuthenticatedUserChanges(): Observable<AuthenticatedUser> {
    return this._authenticatedUserSoruce.asObservable();
  }

  public onAuthenticatedStatusChanges(): Observable<AuthenticatedStatus> {
    return this._authenticatedStatusSource.asObservable();
  }

  public isAuthenticated(): boolean {
    return this._authenticatedStatus === AuthenticatedStatus.AUTHENTICATED;
  }

  public getAuthenticatedUser(): AuthenticatedUser {
    return this._authenticatedUser;
  }

  public authenticateUser(credentiasl: UserCredentials): Observable<AuthenticatedUser> {
    return this._http.post<AuthenticatedUser>(`${this._baseUrl}/login`, credentiasl)
      .pipe(tap((user: AuthenticatedUser) => this._handleSuccessfulAuthentication(user)));  
  }

  public logout(): void {
    this._authenticatedUser = null;
    this._authenticatedStatus = AuthenticatedStatus.UNAUTHENTICATED;
    this._authenticatedUserSoruce.next(this._authenticatedUser);
    this._authenticatedStatusSource.next(this._authenticatedStatus);
  }

  private _handleSuccessfulAuthentication(user: AuthenticatedUser): AuthenticatedUser {
    this._authenticatedUser = user;
    this._authenticatedUserSoruce.next(this._authenticatedUser);
    this._authenticatedStatus = AuthenticatedStatus.AUTHENTICATED;
    this._authenticatedStatusSource.next(this._authenticatedStatus);
    return user;
  }
}
