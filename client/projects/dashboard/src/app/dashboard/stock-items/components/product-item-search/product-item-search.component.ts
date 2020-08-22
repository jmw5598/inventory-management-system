import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms'; 
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Page, PageRequest, ProductItem } from '@inv/core';

import { IAppState } from '@dashboard/core/store/state';
import { searchProductItems } from '@dashboard/core/store/actions';
import { selectProductItemSearchResult } from '@dashboard/core/store/selectors';

@Component({
  selector: 'inv-product-item-search',
  templateUrl: './product-item-search.component.html',
  styleUrls: ['./product-item-search.component.scss']
})
export class ProductItemSearchComponent implements OnInit, OnDestroy {
  @Input()
  public productItem: ProductItem | string;

  @Output()
  public onSelection: EventEmitter<ProductItem>;

  @Output()
  public onDeselection: EventEmitter<ProductItem>;

  private readonly SEARCH_PAGE_OPTIONS = PageRequest.from(1, 5, 'title', 'ASC');
  private _subscriptionSubject: Subject<void>;
  private _autocompleteSearchTextChangeSubject: Subject<string>;
  public form: FormGroup;
  public searchResult: Page<ProductItem>;
  public searchTerm: string = '';
  public nzFilterOption: Function = () => true;

  constructor(
    private _store: Store<IAppState>,
    private _parentControl: ControlContainer
  ) {
    this._subscriptionSubject = new Subject<void>();
    this._autocompleteSearchTextChangeSubject = new Subject<string>();
    this.onSelection = new EventEmitter<ProductItem>();
    this.onDeselection = new EventEmitter<ProductItem>();
  }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
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
    this.onSelection.emit(productItem);
  }

  public onDeselectProductItem(productItem: ProductItem): void {
    this.searchTerm = null;
    this.onDeselection.emit(productItem);
  }

  ngOnDestroy() {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
