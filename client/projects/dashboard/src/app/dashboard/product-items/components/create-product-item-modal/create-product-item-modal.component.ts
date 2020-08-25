import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { Category, ProductItem, ResponseMessage } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { buildProductItemFormGroup } from '@dashboard/shared/forms';
import { createProductItem, setCreateProductItemResponseMessage } from '@dashboard/core/store/actions';
import { selectCategories, selectCreateProductItemResponseMessage } from '@dashboard/core/store/selectors';

export interface CreateProductItemModalCloseResponse {
  hasProductItemsBeenCreated: boolean
}

@Component({
  selector: 'inv-create-product-item-modal',
  templateUrl: './create-product-item-modal.component.html',
  styleUrls: ['./create-product-item-modal.component.scss']
})
export class CreateProductItemModalComponent implements OnInit {
  public form: FormGroup;
  public categories$: Observable<Category[]>;
  public createProductItemResponseMessage$: Observable<ResponseMessage>;
  private _hasProductItemsBeenCreated: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private _modal: NzModalRef
  ) {
    this.form = this._formBuilder.group({
      productItem: buildProductItemFormGroup(this._formBuilder)
    });
  }

  ngOnInit(): void {
    this.categories$ = this._store.select(selectCategories);
    this._hasProductItemsBeenCreated = false;
    this.createProductItemResponseMessage$ = this._store.select(selectCreateProductItemResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.form.reset();
            setTimeout(() => this._store.dispatch(setCreateProductItemResponseMessage(null)), 3000);
          }
        })
      )
  }

  public onSubmit(formValue: { productItem: ProductItem }): void {
    this._hasProductItemsBeenCreated = true;
    this._store.dispatch(createProductItem(formValue.productItem));
  }

  public onCloseModal(): void {
    this._modal.destroy({
      hasProductItemsBeenCreated: this._hasProductItemsBeenCreated
    } as CreateProductItemModalCloseResponse);
  }
}
