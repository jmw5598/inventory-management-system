import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { InvCoreConfig, INV_CORE_CONFIG } from '../inv-core.config';
import { AbstractCrudService } from './abstract-crud.service';
import { StockItem } from '../models/stock-item.model';
import { IPageable } from '../models/paging/pageable.interface';
import { Page } from '../models/paging/page.model';

@Injectable()
export class StockItemsService extends AbstractCrudService<StockItem, number> {
  constructor(
    @Inject(INV_CORE_CONFIG)
    protected _config: InvCoreConfig,
    protected _http: HttpClient
  ) {
    super(_http, `${_config.api.baseUrl}/stock-items`);
  }

  public getStockItemsByPage(page?: IPageable): Observable<Page<StockItem>> {
    const params: {[key: string]: any} = !page ? {} : {
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction,
    };
    return this._http.get<Page<StockItem>>(`${this._base}`, { params: params });
  }

  public searchStockItems(searchTerm: string, page?: IPageable): Observable<Page<StockItem>> {
    const params: {[key: string]: any} = !page ? {} : {
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction,
      // @@@ TODO filter and serach term ehre....
    };
    return this._http.get<Page<StockItem>>(`${this._base}/search`, { params: params });
  }
}
