import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { InvCoreConfig, INV_CORE_CONFIG } from '../inv-core.config';
import { AbstractCrudService } from './abstract-crud.service'; 
import { Account } from '../models/account.model';

@Injectable()
export class AccountsService extends AbstractCrudService<Account, number> {
  constructor(
    @Inject(INV_CORE_CONFIG) 
    protected _config: InvCoreConfig,
    protected _http: HttpClient
  ) { 
    super(_http, `${_config.api.baseUrl}/accounts`);
  }
}
