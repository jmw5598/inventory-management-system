import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { InvCoreConfig, INV_CORE_CONFIG } from '../inv-core.config';
import { AbstractCrudService } from './abstract-crud.service'; 
import { Account } from '../models/account.model';
import { Profile } from '../models/profile.model';
import { PasswordRequestReset } from '../models/password-request-reset.model';
import { PasswordReset } from '../models/password-reset.model';
import { RegistrationResult } from '../dtos/registration-result.dto';
import { ResponseMessage } from '../models/response-message.model';
import { ValidatorResult } from '../models/validator-result.model';

@Injectable()
export class AccountsService extends AbstractCrudService<Account, number> {
  constructor(
    @Inject(INV_CORE_CONFIG) 
    protected _config: InvCoreConfig,
    protected _http: HttpClient
  ) { 
    super(_http, `${_config.api.baseUrl}/accounts`);
  }

  public getAccountDetails(): Observable<Account> {
    return this._http.get<Account>(`${this._base}/details`);
  }

  public updateAccountDetails(details: Account): Observable<Account> {
    return this._http.put<Account>(`${this._base}/details`, details);
  } 

  public getAccountProfile(): Observable<Profile> {
    return this._http.get<Profile>(`${this._base}/profile`);
  }
  
  public updateAccountProfile(profile: Profile): Observable<Profile> {
    return this._http.put<Profile>(`${this._base}/profile`, profile);
  }

  public registerNewAccount(
      registration: RegistrationResult): Observable<RegistrationResult> {
    return this._http.post<RegistrationResult>(`${this._base}/register`, registration);
  }

  public validateEmail(email: string): Observable<ValidatorResult> {
    return this._http.head<ValidatorResult>(`${this._base}/validate/email`, { params: { email: email }})
      .pipe(
        switchMap(() => of({ isValid: false } as ValidatorResult))
      );
  }

  public validateUsername(username: string): Observable<ValidatorResult> {
    return this._http.head<ValidatorResult>(`${this._base}/validate/username`, { params: { username: username }})
      .pipe(
        switchMap(() => of({ isValid: false } as ValidatorResult))
      );
  }

  public passwordRequestReset(request: PasswordRequestReset): Observable<ResponseMessage> {
    return this._http.post<ResponseMessage>(`${this._base}/password-request`, request);
  }

  public passwordReset(resetRequest: PasswordReset): Observable<ResponseMessage> {
    return this._http.post<ResponseMessage>(`${this._base}/password-reset`, resetRequest);    
  }
}
