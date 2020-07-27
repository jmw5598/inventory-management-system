import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CrudOperations<T, ID> {
  save(t: T): Observable<T>;
  update(id: ID, t: T): Observable<T>;
  delete(id: ID): Observable<T>;
  findOne(id: ID): Observable<T>;
  findAll(): Observable<T[]>;
}

export abstract class AbstractCrudService<T, ID> implements CrudOperations<T, ID> {
  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) {}

  public save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  public update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(`${this._base}/${id}`, t, {});
  }

  public delete(id: ID): Observable<T> {
    return this._http.delete<T>(`${this._base}/${id}`);
  }

  public findOne(id: ID): Observable<T> {
    return this._http.get<T>(`${this._base}/${id}`);
  }

  public findAll(): Observable<T[]> {
    return this._http.get<T[]>(`${this._base}`); 
  }

  // @@@ TODO : Create an additional abstract pageable crud service
  //            which extends this class implement pageable endpoint.
  //            This will be kept in separate abstract class since not
  //            all crud services will need paging?? (Just an idea)
}
