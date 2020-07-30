import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable, Subject, of } from 'rxjs';
import { tap, takeUntil, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

import { ProductItem, Page, IPageable, PageRequest } from '@inv/core';
import { IAppState } from '../../../../core/store/state/app.state';
import { selectProductItemSearchResult, selectProductItemPageResult } from '../../../../core/store/selectors/product-item-selector';
import { searchProductItems, getProductItemsByPage } from '../../../../core/store/actions/product-item.actions';


@Component({
  selector: 'inv-manage-product-items',
  templateUrl: './manage-product-items.component.html',
  styleUrls: ['./manage-product-items.component.scss']
})
export class ManageProductItemsComponent implements OnInit {
  private readonly DEFAULT_PAGE: IPageable;
  private _subscriptionSubject: Subject<void>;
  private _searchTextChangeSubject: Subject<string>
  public currentPage: Page<ProductItem>;
  public searchTerm: string = '';

  constructor(private _store: Store<IAppState>) {
    this._subscriptionSubject = new Subject<void>();
    this._searchTextChangeSubject = new Subject<string>();
    this.DEFAULT_PAGE = PageRequest.from(1, 10, 'title', 'ASC');
  }

  ngOnInit(): void {
    this._store.select(selectProductItemSearchResult)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(page => this.currentPage = page);

    this._store.select(selectProductItemPageResult)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(page => this.currentPage = page);
    
    this._searchTextChangeSubject
      .pipe(
        takeUntil(this._subscriptionSubject),
        debounceTime(500),
        distinctUntilChanged(),
        tap(search => this.onFilterProductItems())
      ).subscribe();

      this.onFilterProductItems();
  }

  public onPageChange(pageNumber: number): void {
    const page: IPageable = PageRequest.from(
      pageNumber,
      this.currentPage.current.size,
      this.currentPage.current.sort.column,
      this.currentPage.current.sort.direction
    );
    this._store.dispatch(searchProductItems({
      searchTerm: this.searchTerm,
      pageable: page
    }));
  }

  public onSearchProductItemsKeyup($event): void {
    this._searchTextChangeSubject.next($event.target.value);
  }

  public onFilterProductItems(): void {
    const pageable: IPageable = this.DEFAULT_PAGE;
    this._store.dispatch(searchProductItems({
      searchTerm: this.searchTerm,
      pageable: pageable
    }));
  }

  ngOnDestroy() {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
