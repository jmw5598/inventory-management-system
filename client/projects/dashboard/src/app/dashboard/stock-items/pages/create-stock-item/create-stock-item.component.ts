import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { IAppState } from '@dashboard/core/store/state';
import { Page, PageRequest, StockItem, ProductItem } from '@inv/core';
import { searchProductItems } from '@dashboard/core/store/actions';
import { selectProductItemSearchResult } from '@dashboard/core/store/selectors';

@Component({
  selector: 'inv-create-stock-item',
  templateUrl: './create-stock-item.component.html',
  styleUrls: ['./create-stock-item.component.scss']
})
export class CreateStockItemComponent implements OnInit, OnDestroy {
  private readonly SEARCH_PAGE_OPTIONS = PageRequest.from(1, 5, 'title', 'ASC');
  private _subscriptionSubject: Subject<void>;
  private _autocompleteSearchTextChangeSubject: Subject<string>;
  public searchResult: Page<ProductItem>;
  public searchTerm: string = '';

  nzFilterOption = () => true;

  public productItem: ProductItem | string;
  
  constructor(private _store: Store<IAppState>) {
    this._subscriptionSubject = new Subject<void>();
    this._autocompleteSearchTextChangeSubject = new Subject<string>();
  }

  ngOnInit(): void {
    // Update store for autocomplete serach values for stock items?
    // Create endpoint for this search?? or use existing paged search??
    // select and subscirbe to this piece of state
    this._store.select(selectProductItemSearchResult)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(page => this.searchResult = page)
   
    // sub to search change and debounce
    this._autocompleteSearchTextChangeSubject
      .pipe(
        takeUntil(this._subscriptionSubject),
        debounceTime(500),
        distinctUntilChanged(),
        tap(search => this.onFilterStockItems(search))
      ).subscribe();
  }

  public onCreateStockItem(item: StockItem): void {
    console.log("creating ", item);
  }

  public onSearchStockItemsKeyup(searchTerm): void {
    this._autocompleteSearchTextChangeSubject.next(searchTerm);
  }

  public onFilterStockItems(searchTerm: string): void {
    this._store.dispatch(searchProductItems({
      searchTerm: searchTerm,
      pageable: this.SEARCH_PAGE_OPTIONS 
    }));
  }

  public onSearchOptionSelected(productItem: ProductItem): void {
    console.log('selected: ', productItem);
    this.productItem = productItem;
    console.log('this.productItem: ', this.productItem);
  }

  ngOnDestroy() {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
