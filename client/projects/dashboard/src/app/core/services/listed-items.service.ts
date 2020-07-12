import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCrudService } from './abstract-crud.service'; 
import { ListedItem } from '../models/listed-item.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListedItemsService extends AbstractCrudService<ListedItem, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.base}/listed-items`);
  }
}
