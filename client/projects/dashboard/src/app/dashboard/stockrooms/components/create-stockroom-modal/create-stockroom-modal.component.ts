import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { ResponseMessage, Stockroom } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { buildStockroomFormGroup } from '@dashboard/shared/forms';
import { createStockroom, setCreateStockroomResponseMessage } from '@dashboard/core/store/actions';
import { selectCreateStockroomResponseMessage } from '@dashboard/core/store/selectors';

export interface CreateStockroomModalCloseResponse {
  hasStockroomsBeenCreated: boolean
}

@Component({
  selector: 'inv-create-stockroom-modal',
  templateUrl: './create-stockroom-modal.component.html',
  styleUrls: ['./create-stockroom-modal.component.scss']
})
export class CreateStockroomModalComponent implements OnInit {
  public form: FormGroup;
  public createStockroomResponseMessage$: Observable<ResponseMessage>;
  private _hasStockroomsBeenCreated: boolean;

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
    this._hasStockroomsBeenCreated = false;
    this.createStockroomResponseMessage$ = this._store.select(selectCreateStockroomResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.form.reset();
            setTimeout(() => this._store.dispatch(setCreateStockroomResponseMessage(null)), 3000);
          }
        })
      )
  }

  public onSubmit(formValue: { stockroom: Stockroom }): void {
    this._hasStockroomsBeenCreated = true;
    this._store.dispatch(createStockroom(formValue.stockroom));
  }

  public onCloseModal(): void {
    this._modal.destroy({
      hasStockroomsBeenCreated: this._hasStockroomsBeenCreated
    } as CreateStockroomModalCloseResponse);
  }
}
