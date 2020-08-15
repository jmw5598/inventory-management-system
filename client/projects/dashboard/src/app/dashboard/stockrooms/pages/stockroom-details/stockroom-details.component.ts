import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { Page, Stockroom, StockItem, IPageable, PageRequest } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectSelectedStockroom, selectStockItemSearchResult } from '@dashboard/core/store/selectors';
import { searchStockItems } from '@dashboard/core/store/actions';

@Component({
  selector: 'inv-stockroom-details',
  templateUrl: './stockroom-details.component.html',
  styleUrls: ['./stockroom-details.component.scss']
})
export class StockroomDetailsComponent implements OnInit, OnDestroy {
  public selectedStockroom$: Observable<Stockroom>;
  private _subscriptionSubject: Subject<void>;
  private _searchTextChangeSubject: Subject<string>
  public currentPage: Page<StockItem>;
  public searchTerm: string = '';

  constructor(private _store: Store<IAppState>) {
    this._subscriptionSubject = new Subject<void>();
    this._searchTextChangeSubject = new Subject<string>();
  }

  ngOnInit(): void {
    this.selectedStockroom$ = this._store.select(selectSelectedStockroom);
    this._store.select(selectStockItemSearchResult)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(page => this.currentPage = page);
    
    this._searchTextChangeSubject
      .pipe(
        takeUntil(this._subscriptionSubject),
        debounceTime(500),
        distinctUntilChanged(),
        tap(search => this.onFilterStockItems())
      ).subscribe();
  }

  public onResetStockItemSearch(): void {
    this.searchTerm = "";
    this.onFilterStockItems();
  }

  public onPageChange(pageNumber: number): void {
    const page: IPageable = PageRequest.from(
      pageNumber,
      this.currentPage.current.size,
      this.currentPage.current.sort.column,
      this.currentPage.current.sort.direction
    );
    this._store.dispatch(searchStockItems({
      searchTerm: this.searchTerm,
      pageable: page
    }));
  }

  public onDeleteStockItem(product: StockItem): void {
    //this._store.dispatch(deleteStockItem({ id: product.id }));
  }

  public onSearchStockItemsKeyup($event): void {
    this._searchTextChangeSubject.next($event.target.value);
  }

  public onFilterStockItems(): void {
    const pageable: IPageable = this.currentPage.current;
    this._store.dispatch(searchStockItems({
      searchTerm: this.searchTerm,
      pageable: pageable
    }));
  }

  ngOnDestroy() {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}