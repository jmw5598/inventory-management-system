import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCrudService } from './abstract-crud.service';
import { Stockroom } from '../models/stockroom.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockroomsService extends AbstractCrudService<Stockroom, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.base}/stockrooms`); 
  }
}
