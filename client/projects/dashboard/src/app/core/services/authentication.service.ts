import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticatedUser } from '../models/authenticated-user.model'; 
import { UserCredentials } from '../models/user-credentials.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = environment.auth.base;
  }

  public authenticateUser(credentials: UserCredentials): Observable<AuthenticatedUser> {
    return this._http.post<AuthenticatedUser>(`${this._baseUrl}/login`, credentials);
  }
}
