import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Stockroom } from '@inv/core';
import { IAppState } from '../../../../core/store/state/app.state';
import { selectSelectedStockroom } from '../../../../core/store/selectors/stockroom.selector';

@Component({
  selector: 'inv-stockroom-details',
  templateUrl: './stockroom-details.component.html',
  styleUrls: ['./stockroom-details.component.scss']
})
export class StockroomDetailsComponent implements OnInit {
  public selectedStockroom$: Observable<Stockroom>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.selectedStockroom$ = this._store.select(selectSelectedStockroom);
  }
}