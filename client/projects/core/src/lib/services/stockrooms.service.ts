import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InvCoreConfig, INV_CORE_CONFIG } from '../inv-core.config';
import { AbstractCrudService } from './abstract-crud.service';
import { Stockroom } from '../models/stockroom.model';
import { StockroomSummary } from '../models/stockroom-summary.model';

@Injectable()
export class StockroomsService extends AbstractCrudService<Stockroom, number> {
  constructor(
    @Inject(INV_CORE_CONFIG)
    protected _config: InvCoreConfig,
    protected _http: HttpClient
  ) {
    super(_http, `${_config.api.baseUrl}/stockrooms`); 
  }

  public getStockroomSummaries(): Observable<StockroomSummary[]> {
    return this._http.get<StockroomSummary[]>(`${this._base}/summary`);
  }
}
