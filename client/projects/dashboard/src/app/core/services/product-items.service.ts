import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCrudService } from './abstract-crud.service';
import { ProductItem } from '../models/product-item.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductItemsService extends AbstractCrudService<ProductItem, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.base}/product-items`);
  }
}
