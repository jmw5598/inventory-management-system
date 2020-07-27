import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { InvCoreConfig, INV_CORE_CONFIG } from '../inv-core.config';
import { AuthenticatedUser } from '../models/authenticated-user.model'; 
import { UserCredentials } from '../models/user-credentials.model';


@Injectable()
export class AuthenticationService {
  private readonly AUTH_USER_KEY: string = "AUTHUSER";
  private readonly REMEMBER_ME_KEY: string = "REMEMBERME";
  private _baseUrl: string;

  constructor(
    @Inject(INV_CORE_CONFIG) 
    private _config: InvCoreConfig,
    private _http: HttpClient
  ) {
    this._baseUrl = this._config.auth.baseUrl;
  }

  public authenticateUser(credentials: UserCredentials): Observable<AuthenticatedUser> {
    return this._http.post<AuthenticatedUser>(`${this._baseUrl}/login`, credentials)
      .pipe(tap((user: AuthenticatedUser) => {
        this._handleRememberMe(credentials);
        this._handleAuthenticatedUser(user);
      }));
  }
  
  public refreshToken(accessToken: string, refreshToken: string): Observable<AuthenticatedUser> {
    return this._http.post<AuthenticatedUser>(`${this._baseUrl}/token`, {
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  }

  public logoutUser(): void {
    localStorage.removeItem(this.AUTH_USER_KEY);  
  }

  public getStoredAuthenticatedUser(): AuthenticatedUser {
    const userJson: string = localStorage.getItem(this.AUTH_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  public getStoredRememberMe(): UserCredentials {
    const credentialsJson: string = localStorage.getItem(this.REMEMBER_ME_KEY);
    return credentialsJson ? JSON.parse(credentialsJson) : null;
  }

  private _handleRememberMe(credentials: UserCredentials): void {
    if (credentials.rememberMe) {
      localStorage.setItem(this.REMEMBER_ME_KEY, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(this.REMEMBER_ME_KEY);
    }
  }

  private _handleAuthenticatedUser(user: AuthenticatedUser): void {
    localStorage.setItem(this.AUTH_USER_KEY, JSON.stringify(user));
  }
}
