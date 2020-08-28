import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, take, filter } from 'rxjs/operators'; 
import { NzModalRef } from 'ng-zorro-antd/modal';

import { Category, ProductItem, ResponseMessage } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { buildProductItemFormGroup } from '@dashboard/shared/forms';
import { updateProductItem, setUpdateProductItemResponseMessage } from '@dashboard/core/store/actions';
import { selectCategories, selectUpdateProductItemResponseMessage, selectSelectedProductItem } from '@dashboard/core/store/selectors';

export interface UpdateProductItemModalCloseResponse {
  hasProductItemsBeenUpdated: boolean
}

@Component({
  selector: 'inv-update-product-item-modal',
  templateUrl: './update-product-item-modal.component.html',
  styleUrls: ['./update-product-item-modal.component.scss']
})
export class UpdateProductItemModalComponent implements OnInit {
  public form: FormGroup;
  public categories$: Observable<Category[]>;
  public createProductItemResponseMessage$: Observable<ResponseMessage>;
  private _hasProductItemsBeenUpdated: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private _modal: NzModalRef
  ) {
    this.form = this._formBuilder.group({
      productItem: buildProductItemFormGroup(this._formBuilder)
    });
    
    this._store.select(selectSelectedProductItem)
      .pipe(
        filter((productItem: ProductItem) => !!productItem),
        tap((productItem: ProductItem) => this._patchProductItemToForm(productItem)),
        take(1)
      ).subscribe(); 
  }

  ngOnInit(): void {
    this.categories$ = this._store.select(selectCategories);
    this._hasProductItemsBeenUpdated = false;
    this.createProductItemResponseMessage$ = this._store.select(selectUpdateProductItemResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            setTimeout(() => this._store.dispatch(setUpdateProductItemResponseMessage(null)), 3000);
          }
        })
      )
  }

  public onSubmit(formValue: { productItem: ProductItem }): void {
    this._hasProductItemsBeenUpdated = true;
    const productItem: ProductItem = formValue.productItem;
    this._store.dispatch(updateProductItem({
      id: productItem.id,
      product: productItem
    }));
  }

  public onCloseModal(): void {
    this._modal.destroy({
      hasProductItemsBeenUpdated: this._hasProductItemsBeenUpdated
    } as UpdateProductItemModalCloseResponse);
  }

  private _patchProductItemToForm(productItem: ProductItem): void {
    this.form.get('productItem').patchValue(productItem);
  }
}
