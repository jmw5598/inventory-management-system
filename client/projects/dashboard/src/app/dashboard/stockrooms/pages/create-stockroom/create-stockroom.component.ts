import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { StockroomFormComponent } from '../../components/stockroom-form/stockroom-form.component';
import { Stockroom, ResponseMessage } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { createStockroom, setCreateStockroomResponseMessage } from '@dashboard/core/store/actions'; 
import { selectSelectedStockroom, selectCreateStockroomResponseMessage } from '@dashboard/core/store/selectors';

@Component({
  selector: 'inv-create-stockroom',
  templateUrl: './create-stockroom.component.html',
  styleUrls: ['./create-stockroom.component.scss']
})
export class CreateStockroomComponent implements OnInit {
  @ViewChild(StockroomFormComponent, { static: true })
  public formComponent: StockroomFormComponent;

  public selectedStockroom$: Observable<Stockroom>;
  public createStockroomResponseMessage$: Observable<ResponseMessage>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.selectedStockroom$ = this._store.select(selectSelectedStockroom);
    this.createStockroomResponseMessage$ = this._store.select(selectCreateStockroomResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.formComponent.resetForm();
            setTimeout(() => this._store.dispatch(setCreateStockroomResponseMessage(null)), 3000);
          }
        })
      )
  }

  public onCreateStockroom(stockroom: Stockroom): void {
    this._store.dispatch(createStockroom(stockroom));
  }
}
