import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductItem } from '@inv/core';

@Component({
  selector: 'inv-product-item-selection',
  templateUrl: './product-item-selection.component.html',
  styleUrls: ['./product-item-selection.component.scss']
})
export class ProductItemSelectionComponent implements OnInit {
  @Input()
  public productItem: ProductItem;

  @Output()
  public onDeselectProductItem: EventEmitter<ProductItem>;

  constructor() {
    this.onDeselectProductItem = new EventEmitter<ProductItem>();
  }

  ngOnInit(): void {
  }

  public deselectProductItem(): void {
    this.productItem = null;
    this.onDeselectProductItem.emit(this.productItem); 
  }
}
