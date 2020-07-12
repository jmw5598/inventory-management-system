import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCrudService } from './abstract-crud.service'; 
import { Account } from '../models/account.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService extends AbstractCrudService<Account, number> {
  constructor(protected _http: HttpClient) { 
    super(_http, `${environment.api.base}/accounts`);
  }
}
