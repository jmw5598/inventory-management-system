import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Category } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { getCategories } from '../store/actions/category.actions';
import { selectCategories } from '../store/selectors/category.selector';

@Injectable({
  providedIn: 'root'
})
export class CategoriesGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getCategoriesFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _getCategoriesFromStoreOrApi(): Observable<Category[]> {
    return this._store.select(selectCategories).pipe(
      tap((categories: Category[]) => {
        if (!categories || categories.length === 0) {
          this._store.dispatch(getCategories());
        }
      }),
      filter((categories: Category[]) => !!categories),
      take(1)
    );
  }
}
