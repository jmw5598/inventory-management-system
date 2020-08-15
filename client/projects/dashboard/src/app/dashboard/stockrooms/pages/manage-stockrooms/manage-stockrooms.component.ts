import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { StockroomSummary } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectStockroomSummaries } from '@dashboard/core/store/selectors';
import { deleteStockroom, getStockroomSummaries, getStockroomSummariesSuccess } from '@dashboard/core/store/actions';

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

  constructor(private _store: Store<IAppState>) {
    this.stockroomSummaryTotals = new StockroomSummaryTotals();
  }

  ngOnInit(): void {
    this.stockroomSummaries$ = this._store.select(selectStockroomSummaries)
      .pipe(tap((summaries: StockroomSummary[]) => this._setStockroomSummaryTotals(summaries)));;
      
  }

  public onDeleteStockroom(stockroomId: number): void {
    this._store.dispatch(deleteStockroom({ id: stockroomId }));
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

  ngOnDestroy(): void {
    this._store.dispatch(getStockroomSummariesSuccess(null));
  }
}
