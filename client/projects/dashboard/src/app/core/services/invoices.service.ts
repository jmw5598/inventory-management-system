import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCrudService } from './abstract-crud.service';
import { Invoice } from '../models/invoice.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService extends AbstractCrudService<Invoice, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.base}/invoices`);
  }
}
