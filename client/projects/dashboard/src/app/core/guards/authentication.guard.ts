import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenitcationService } from '../services/authenitcation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private _authenticationService: AuthenitcationService,
    private _router: Router
  ) { } 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this._authenticationService.isAuthenticated()) {
      return true;
    }
    this._router.navigate(['/auth', 'login']);
    return false;
  }
}
