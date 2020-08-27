import { Component, OnInit } from '@angular/core'; import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { ResponseMessage, Stockroom } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { buildStockroomFormGroup } from '@dashboard/shared/forms';
import { updateStockroom, setUpdateStockroomResponseMessage } from '@dashboard/core/store/actions';
import { selectUpdateStockroomResponseMessage } from '@dashboard/core/store/selectors';

export interface UpdateStockroomModalCloseResponse {
  hasStockroomsBeenUpdated: boolean
}

@Component({
  selector: 'inv-update-stockroom-modal',
  templateUrl: './update-stockroom-modal.component.html',
  styleUrls: ['./update-stockroom-modal.component.scss']
})
export class UpdateStockroomModalComponent implements OnInit {
  public form: FormGroup;
  public createStockroomResponseMessage$: Observable<ResponseMessage>;
  private _hasStockroomsBeenUpdated: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private _modal: NzModalRef
  ) {
    this.form = this._formBuilder.group({
      stockroom: buildStockroomFormGroup(this._formBuilder)
    });
  }

  ngOnInit(): void {
    this._hasStockroomsBeenUpdated = false;
    this.createStockroomResponseMessage$ = this._store.select(selectUpdateStockroomResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.form.reset();
            setTimeout(() => this._store.dispatch(setUpdateStockroomResponseMessage(null)), 3000);
          }
        })
      )
  }

  public onSubmit(formValue: { stockroom: Stockroom }): void {
    this._hasStockroomsBeenUpdated = true;
    const stockroom: Stockroom = formValue.stockroom;
    this._store.dispatch(updateStockroom({
      id: stockroom.id,
      stockroom: stockroom 
    }));
  }

  public onCloseModal(): void {
    this._modal.destroy({
      hasStockroomsBeenUpdated: this._hasStockroomsBeenUpdated
    } as UpdateStockroomModalCloseResponse);
  }
}
