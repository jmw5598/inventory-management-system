import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Stockroom, ResponseMessage } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectSelectedStockroom, selectUpdateStockroomResponseMessage } from '@dashboard/core/store/selectors';
import { updateStockroom, setUpdateStockroomResponseMessage, setSelectedStockroom } from '@dashboard/core/store/actions';

@Component({
  selector: 'inv-edit-stockroom',
  templateUrl: './edit-stockroom.component.html',
  styleUrls: ['./edit-stockroom.component.scss']
})
export class EditStockroomComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    this._store.dispatch(setSelectedStockroom(null));
  }
}
