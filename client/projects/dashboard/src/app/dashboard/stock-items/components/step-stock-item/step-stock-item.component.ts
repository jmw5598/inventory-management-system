import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ItemCondition, Stockroom } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectCurrentStockrooms, selectItemConditions } from '@dashboard/core/store/selectors';

@Component({
  selector: 'inv-step-stock-item',
  templateUrl: './step-stock-item.component.html',
  styleUrls: ['./step-stock-item.component.scss']
})
export class StepStockItemComponent implements OnInit {
  public itemConditions$: Observable<ItemCondition[]>;
  public stockrooms$: Observable<Stockroom[]>;

  constructor(
    private _store: Store<IAppState>
  ) {
    this.itemConditions$ = this._store.select(selectItemConditions);
    this.stockrooms$ = this._store.select(selectCurrentStockrooms);
  }

  ngOnInit(): void {
  }
}
