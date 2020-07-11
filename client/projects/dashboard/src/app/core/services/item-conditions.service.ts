import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCrudService } from './abstract-crud.service';
import { ItemCondition } from '../models/item-condition.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemConditionsService extends AbstractCrudService<ItemCondition, number> { 
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.base}/item-conditions`);
  }
}
