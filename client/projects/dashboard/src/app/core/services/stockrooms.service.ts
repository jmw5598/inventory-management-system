import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractCrudService } from './abstract-crud.service';
import { Stockroom } from '../models/stockroom.model';
import { environment } from '../../../environments/environment';
import { StockroomSummary } from '../models/stockroom-summary.model';

@Injectable({
  providedIn: 'root'
})
export class StockroomsService extends AbstractCrudService<Stockroom, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.base}/stockrooms`); 
  }

  public getStockroomSummaries(): Observable<StockroomSummary[]> {
    return this._http.get<StockroomSummary[]>(`${this._base}/summary`);
  }
}
