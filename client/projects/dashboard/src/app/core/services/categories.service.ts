import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCrudService } from './abstract-crud.service';
import { Category } from '../models/category.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends AbstractCrudService<Category, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.base}/categories`);
  }
}
