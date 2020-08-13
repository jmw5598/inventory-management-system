import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Stockroom, ResponseMessage } from '@inv/core';
import { IAppState } from '../../../../core/store/state/app.state';
import { selectSelectedStockroom, selectUpdateStockroomResponseMessage } from '../../../../core/store/selectors/stockroom.selector';
import { updateStockroom, setUpdateStockroomResponseMessage } from '../../../../core/store/actions/stockroom.actions';

@Component({
  selector: 'inv-edit-stockroom',
  templateUrl: './edit-stockroom.component.html',
  styleUrls: ['./edit-stockroom.component.scss']
})
export class EditStockroomComponent implements OnInit {
  public selectedStockroom$: Observable<Stockroom>;
  public updateStockroomResponseMessage$: Observable<ResponseMessage>;
  
  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.selectedStockroom$ = this._store.select(selectSelectedStockroom);
    this.updateStockroomResponseMessage$ = this._store.select(selectUpdateStockroomResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            setTimeout(() => this._store.dispatch(setUpdateStockroomResponseMessage(null)), 3000);
          }
        })
      );
  }

  public onUpdateStockroom(stockroom: Stockroom): void {
    this._store.dispatch(updateStockroom({id: stockroom.id, stockroom: stockroom }));
  }
}
