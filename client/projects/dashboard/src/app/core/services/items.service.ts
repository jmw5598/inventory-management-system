import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCrudService } from './abstract-crud.service';
import { Item } from '../models/item.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService extends AbstractCrudService<Item, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.base}/items`);
  }
}
