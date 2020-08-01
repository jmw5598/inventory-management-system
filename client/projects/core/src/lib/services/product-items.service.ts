import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { InvCoreConfig, INV_CORE_CONFIG } from '../inv-core.config';
import { AbstractCrudService } from './abstract-crud.service';
import { IPageable } from '../models/paging/pageable.interface';
import { PageRequest } from '../models/paging/page-request.model';
import { Page } from '../models/paging/page.model';
import { ProductItem } from '../models/product-item.model';

@Injectable()
export class ProductItemsService extends AbstractCrudService<ProductItem, number> {
  constructor(
    @Inject(INV_CORE_CONFIG)
    protected _config: InvCoreConfig,
    protected _http: HttpClient
  ) {
    super(_http, `${_config.api.baseUrl}/product-items`);
  }
  
  public getProductItemsByPage(page?: IPageable): Observable<Page<ProductItem>> {
    const params: {[key: string]: any} = !page ? {} : { 
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction
    };
    return this._http.get<Page<ProductItem>>(`${this._base}`, { params: params });
  }

  public searchProductItems(searchTerm: string, page?: IPageable): Observable<Page<ProductItem>> {
    const params: {[key: string]: any} = !page ? {} : { 
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction,
      searchTerm: searchTerm
    };
    return this._http.get<Page<ProductItem>>(`${this._base}/search`, { params: params });
  }
}
