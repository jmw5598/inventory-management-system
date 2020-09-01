import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';


import { ResponseMessage, StockItem, ProductItem } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { buildProductItemFormGroup, buildStockItemFormGroup } from '@dashboard/shared/forms';
import { createStockItem, setCreateStockItemResponseMessage, setCreateProductItemResponseMessage } from '@dashboard/core/store/actions';
import { selectCreateStockItemResponseMessage } from '@dashboard/core/store/selectors';

import { CreateStockItemStep } from './create-stock-item-step.enum';

export interface CreateStockItemModalCloseResponse {
  hasStockItemsBeenCreated: boolean
}

@Component({
  selector: 'inv-create-stock-item-modal',
  templateUrl: './create-stock-item-modal.component.html',
  styleUrls: ['./create-stock-item-modal.component.scss']
})
export class CreateStockItemModalComponent implements OnInit {
  public CreateStockItemStep = CreateStockItemStep
  public form: FormGroup;
  public createStockItemResponseMessage$: Observable<ResponseMessage>;
  private _hasStockItemsBeenCreated: boolean;
  public step: CreateStockItemStep;
  public currentStep: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private _modal: NzModalRef
  ) {
    this.form = this._formBuilder.group({
      isNewProductItem: [false, [Validators.required]],
      productItem: buildProductItemFormGroup(this._formBuilder), 
      stockItem: buildStockItemFormGroup(this._formBuilder)
    });
  }

  ngOnInit(): void {
    this.reset();
    this._hasStockItemsBeenCreated = false;
    this.createStockItemResponseMessage$ = this._store.select(selectCreateStockItemResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.form.reset();
            setTimeout(() => this._store.dispatch(setCreateStockItemResponseMessage(null)), 3000);
          }
        })
      );
  }

  public prev(): void {
    this.currentStep -= 1;
    this.changeContent();
  }

  public next(): void {
    this.currentStep += 1;
    this.changeContent();
  }
  
  public reset(): void {
    this.currentStep = 0;
    this.changeContent();
  }

  public changeContent(): void {
    switch (this.currentStep) {
      case 0: {
        this.step = CreateStockItemStep.PRODUCT_ITEM;
        break;
      }
      case 1: {
        this.step = CreateStockItemStep.STOCK_ITEM;
        break;
      }
      default: {
        this.step = CreateStockItemStep.ERROR
      }
    }
  }
  
  public onSubmit(formValue: { productItem: ProductItem, stockItem: StockItem }): void {
    this._hasStockItemsBeenCreated = true;
    // this._store.dispatch(createStockItem()) 
  }

  public onCloseModal(): void {
    this._modal.destroy({
      hasStockItemsBeenCreated: this._hasStockItemsBeenCreated
    } as CreateStockItemModalCloseResponse);
  }
}
