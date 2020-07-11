import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractCrudService } from './abstract-crud.service'; 
import { Platform } from '../models/platform.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService extends AbstractCrudService<Platform, number> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.api.base}/platforms`);
  }
}
