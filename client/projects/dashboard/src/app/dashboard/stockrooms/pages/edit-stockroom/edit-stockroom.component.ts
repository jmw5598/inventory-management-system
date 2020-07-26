import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppState } from '../../../../core/store/state/app.state';
import { selectSelectedStockroom } from '../../../../core/store/selectors/stockroom.selector';
import { Stockroom } from '../../../../core/models/stockroom.model';
import { updateStockroom } from '../../../../core/store/actions/stockroom.actions';

@Component({
  selector: 'inv-edit-stockroom',
  templateUrl: './edit-stockroom.component.html',
  styleUrls: ['./edit-stockroom.component.scss']
})
export class EditStockroomComponent implements OnInit {
  public selectedStockroom$: Observable<Stockroom>;
  
  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.selectedStockroom$ = this._store.select(selectSelectedStockroom);
  }

  public onUpdateStockroom(stockroom: Stockroom): void {
    this._store.dispatch(updateStockroom({id: stockroom.id, stockroom: stockroom }));
  }
}
