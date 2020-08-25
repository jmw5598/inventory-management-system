import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, tap, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { ProductItem, Page, IPageable, PageRequest } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectProductItemSearchResult } from '@dashboard/core/store/selectors';
import { searchProductItems, deleteProductItem } from '@dashboard/core/store/actions';
import { CreateProductItemModalComponent, CreateProductItemModalCloseResponse } from '../../components/create-product-item-modal/create-product-item-modal.component';

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

  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService
  ) {
    this._subscriptionSubject = new Subject<void>();
    this._searchTextChangeSubject = new Subject<string>();
    this.DEFAULT_PAGE = PageRequest.from(1, 10, 'title', 'ASC');
  }

  ngOnInit(): void {
    this._store.select(selectProductItemSearchResult)
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

  public onResetProductItemSearch(): void {
    this.searchTerm = "";
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

  public onDeleteProductItem(product: ProductItem): void {
    this._store.dispatch(deleteProductItem({ id: product.id }));
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

  public showCreateProductItemModal(): void {
    const modalRef: NzModalRef = this._modalService.create({
      nzTitle: 'Create New Product Item',
      nzContent: CreateProductItemModalComponent
    });

    modalRef.afterClose
      .pipe(take(1))
      .subscribe((data: CreateProductItemModalCloseResponse) => {
        if (data.hasProductItemsBeenCreated) {
          this.onFilterProductItems();
        }
      });
  }

  ngOnDestroy() {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
