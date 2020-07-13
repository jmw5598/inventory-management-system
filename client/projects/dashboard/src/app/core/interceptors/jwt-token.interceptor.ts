import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenitcationService } from '../services/authenitcation.service';
import { AuthenticatedUser } from '../models/authenticated-user.model';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private _authenticationService: AuthenitcationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authenticatedUser: AuthenticatedUser = this._authenticationService.getAuthenticatedUser();
    if (authenticatedUser) {
      // @@@ TODO - The Bearer prefix will eventually be provided with the access token an refresh token.
      const authorizationHeaderValue: string = `Bearer ${authenticatedUser.accessToken}`;
      request = request.clone({
        setHeaders: {
          Authorization: authorizationHeaderValue 
        }
      });
    }
    return next.handle(request);
  }
}
