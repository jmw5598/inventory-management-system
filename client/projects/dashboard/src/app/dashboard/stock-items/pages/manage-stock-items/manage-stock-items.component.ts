import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, tap, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { StockItem, Page, IPageable, PageRequest } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectStockItemSearchResult } from '@dashboard/core/store/selectors';
import { searchStockItems, deleteStockItem, getStockItemById } from '@dashboard/core/store/actions';
import { CreateStockItemModalComponent, CreateStockItemModalCloseResponse } from '../../components/create-stock-item-modal/create-stock-item-modal.component';

@Component({
  selector: 'inv-manage-stock-items',
  templateUrl: './manage-stock-items.component.html',
  styleUrls: ['./manage-stock-items.component.scss']
})
export class ManageStockItemsComponent implements OnInit {
  public readonly DEFAULT_PAGE: IPageable;
  private _subscriptionSubject: Subject<void>;
  private _searchTextChangeSubject: Subject<string>;
  public currentPage: Page<StockItem>;
  public searchTerm: string = '';

  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService
  ) {
    this._subscriptionSubject = new Subject<void>();
    this._searchTextChangeSubject = new Subject<string>();
    this.DEFAULT_PAGE = PageRequest.from(1, 10, 'product.title', 'ASC');
  }

  ngOnInit(): void {
    
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

  public onDeleteStockItem(stockItem: StockItem): void {
    this._store.dispatch(deleteStockItem({ id: stockItem.id }));
  }

  public onEditStockItem(stockItem: StockItem): void {
    if (stockItem && stockItem.id) {
      this._store.dispatch(getStockItemById({ id: stockItem.id }));
      this.showEditStockItemModal();
    }
  }

  public onSearchStockItemsKeyup($event): void {
    this._searchTextChangeSubject.next($event.target.value);
  }

  public onFilterStockItems(): void {
    const pageable: IPageable = this.DEFAULT_PAGE;
    this._store.dispatch(searchStockItems({
      searchTerm: this.searchTerm,
      pageable: pageable
    }));
  }
  
  public showCreateStockItemModal(): void {
    const modalRef: NzModalRef = this._modalService.create({
      nzMaskClosable: false,
      nzCloseIcon: '',
      nzTitle: 'Create New Stock Item',
      nzContent: CreateStockItemModalComponent 
    })

    modalRef.afterClose
      .subscribe((data: CreateStockItemModalCloseResponse) => {
        if (data.hasStockItemsBeenCreated) {
          console.log("Create new stock item, refresh table");
          // TODO refresh the table?
        }
      })
  }

  public showEditStockItemModal(): void {
    const modalRef: NzModalRef = this._modalService.create({
      nzMaskClosable: false,
      nzCloseIcon: '',
      nzTitle: 'Update Stock Item',
      // TODO - Create UpdateStockItemModalComponent
      nzContent: CreateStockItemModalComponent 
    })

    modalRef.afterClose
      .subscribe((data: CreateStockItemModalCloseResponse) => {
        if (data.hasStockItemsBeenCreated) {
          console.log("Create new stock item, refresh table");
          // TODO refresh the table?
        }
      })
  }
}
