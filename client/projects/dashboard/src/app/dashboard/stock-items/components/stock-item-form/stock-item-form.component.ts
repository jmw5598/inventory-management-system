import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductItem, StockItem } from '@inv/core';

@Component({
  selector: 'inv-stock-item-form',
  templateUrl: './stock-item-form.component.html',
  styleUrls: ['./stock-item-form.component.scss']
})
export class StockItemFormComponent implements OnInit {
  public stockItem: StockItem;
  public productItem: ProductItem;
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      productItem: this._formBuilder.group({
        id: [],
        title: ['', [Validators.required]],
        sku: [''],
        brand: [''],
        model: [''],
        category: ['', [Validators.required]]
      }),
      // Stock item shouldn't be another group??
      // Should model the stock-item.model class as this
      // is what is sent ot the server.
      stockItem: this._formBuilder.group({
        id: [],
        purchaseDate: ['', [Validators.required]]
      })
    });
  }

  @Input()
  public set productItemValue(productItem: ProductItem) {
    console.log('new product item')
    this.form.controls.productItem.patchValue(productItem);
    this.productItem = productItem;
  }

  @Input()
  public set stockItemValue(stockItem: StockItem) {
    this.form.controls.stockItem.patchValue(stockItem);
    this.stockItem = stockItem; 
  }

  ngOnInit(): void {
  }
  
  public deselectProductItem(): void {
    this.form.controls.productItem.reset();

    // Product item should be two way data bound??
    this.productItem = null;
  }

  public onSubmit(value: any): void {
    console.log(value);
  }
}
