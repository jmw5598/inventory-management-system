import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InvCoreConfig, INV_CORE_CONFIG } from '../inv-core.config';
import { AbstractCrudService } from './abstract-crud.service'; 
import { Account } from '../models/account.model';
import { Registration } from '../dtos/registration.dto';
import { RegistrationResult } from '../dtos/registration-result.dto';

@Injectable()
export class AccountsService extends AbstractCrudService<Account, number> {
  constructor(
    @Inject(INV_CORE_CONFIG) 
    protected _config: InvCoreConfig,
    protected _http: HttpClient
  ) { 
    super(_http, `${_config.api.baseUrl}/accounts`);
  }

  public registerNewAccount(
      registration: RegistrationResult): Observable<RegistrationResult> {
    return this._http.post<RegistrationResult>(`${this._base}/register`, registration);
  }
}
