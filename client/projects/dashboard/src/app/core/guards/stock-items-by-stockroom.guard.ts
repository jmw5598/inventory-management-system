import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IPageable, StockItem, Page, PageRequest } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { StockItemSearch, searchStockItems, searchStockItemSuccess } from '../store/actions/stock-item.actions';
import { selectStockItemSearchResult } from '../store/selectors/stock-item.selector';

@Injectable({
  providedIn: 'root'
})
export class StockItemsByStockroomGuard implements CanActivate {
  constructor(
    private _store: Store<IAppState>,
    private _router: Router
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const stockroomId: number = +next.paramMap.get('id');
    return this._getStockItemsSearchResultFromStoreOrApi(stockroomId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _getStockItemsSearchResultFromStoreOrApi(stockroomId: number): Observable<Page<StockItem>> {
    // create page (maybe have constant file with default values for  page...)
    // Add stockroom id into page.
    //
    return this._store.select(selectStockItemSearchResult).pipe(
      tap((page: Page<StockItem>) => {
        // TODO if page is null or page.filter.stockroomId !== stockroomId
        const pageable: IPageable = PageRequest.from(1, 10, 'purchaseDate', 'DESC');
        const search: StockItemSearch = {
          pageable: pageable,
          searchTerm: ''
        };
        this._store.dispatch(searchStockItems(search));
      }),
      filter((page: Page<StockItem>) => !!page),
      take(1)
    );
  }
}
