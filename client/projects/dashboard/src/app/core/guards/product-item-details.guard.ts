import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ProductItem } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { getProductItemById } from '../store/actions/product-item.actions';
import { selectSelectedProductItem } from '../store/selectors/product-item-selector';

@Injectable({
  providedIn: 'root'
})
export class ProductItemDetailsGuard implements CanActivate {
  constructor(
    private _store: Store<IAppState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const productItemId: number = +next.paramMap.get('id');
    return this._getSelectedProductItemFromStoreOrApi(productItemId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _getSelectedProductItemFromStoreOrApi(productItemId: number): Observable<ProductItem> {
    return this._store.select(selectSelectedProductItem).pipe(
      tap((product: ProductItem) => {
        if (!product || product.id !== productItemId) {
          this._store.dispatch(getProductItemById({ id: productItemId }));
        }
      }),
      filter((product: ProductItem) => !!product),
      take(1),
    );
  }
}
