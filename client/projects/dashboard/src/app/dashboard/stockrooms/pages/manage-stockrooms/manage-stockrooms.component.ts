import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { Stockroom, StockroomSummary } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectStockroomSummaries } from '@dashboard/core/store/selectors';
import { deleteStockroom, getStockroomSummaries, getStockroomSummariesSuccess, getStockroomById } from '@dashboard/core/store/actions';
import { CreateStockroomModalComponent, CreateStockroomModalCloseResponse } from '../../components/create-stockroom-modal/create-stockroom-modal.component';
import { UpdateStockroomModalComponent, UpdateStockroomModalCloseResponse } from '../../components/update-stockroom-modal/update-stockroom-modal.component';

class StockroomSummaryTotals {
  public stockroomCount: number = 0;
  public itemCount: number = 0;
  public listedCount: number = 0;
  public purchaseValue: number = 0;
};

@Component({
  selector: 'inv-manage-stockrooms',
  templateUrl: './manage-stockrooms.component.html',
  styleUrls: ['./manage-stockrooms.component.scss']
})
export class ManageStockroomsComponent implements OnInit, OnDestroy {
  public stockroomSummaries$: Observable<StockroomSummary[]>;
  public stockroomSummaryTotals: StockroomSummaryTotals;

  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService
  ) {
    this.stockroomSummaryTotals = new StockroomSummaryTotals();
  }

  ngOnInit(): void {
    this.stockroomSummaries$ = this._store.select(selectStockroomSummaries)
      .pipe(tap((summaries: StockroomSummary[]) => this._setStockroomSummaryTotals(summaries)));;
      
  }

  public onDeleteStockroom(stockroomId: number): void {
    this._store.dispatch(deleteStockroom({ id: stockroomId }));
  }

  public onEditStockroom(stockroom: Stockroom): void {
    if (stockroom && stockroom.id) {
      this._store.dispatch(getStockroomById({ id: stockroom.id }));
      this.showEditStockroomModal();
    }
  }

  public onReloadStockroomSummaries(): void {
    this._store.dispatch(getStockroomSummaries());
  }

  private _setStockroomSummaryTotals(summaries: StockroomSummary[]): void {
    setTimeout(() => {
      this.stockroomSummaryTotals = summaries.reduce((total, summary) => {
        total.stockroomCount += 1;
        total.itemCount += summary.itemCount || 0;
        total.listedCount += summary.listedCount || 0;
        total.purchaseValue += summary.purchaseValue || 0;
        return total;
      }, new StockroomSummaryTotals());
    });
  }

  public showCreateStockroomModal(): void {
    const modalRef: NzModalRef = this._modalService.create({
      nzMaskClosable: false,
      nzCloseIcon: '',
      nzTitle: 'Create New Stockroom',
      nzContent: CreateStockroomModalComponent
    });

    modalRef.afterClose
      .pipe(take(1))
      .subscribe((data: CreateStockroomModalCloseResponse) => {
        if (data.hasStockroomsBeenCreated) {
          this.onReloadStockroomSummaries();
        }
      })
  }

  public showEditStockroomModal(): void {
    const modalRef: NzModalRef = this._modalService.create({
      nzMaskClosable: false,
      nzCloseIcon: '',
      nzTitle: 'Update Stockroom Details',
      nzContent: UpdateStockroomModalComponent
    });

    modalRef.afterClose
      .pipe(take(1))
      .subscribe((data: UpdateStockroomModalCloseResponse) => {
        if (data.hasStockroomsBeenUpdated) {
          this.onReloadStockroomSummaries();
        }
      })
  }

  ngOnDestroy(): void {
    this._store.dispatch(getStockroomSummariesSuccess(null));
  }
}
