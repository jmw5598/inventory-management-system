import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCrudService } from './abstract-crud.service';
import { Plan } from '../models/plan.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlansService extends AbstractCrudService<Plan, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.base}/plans`);
  }
}
