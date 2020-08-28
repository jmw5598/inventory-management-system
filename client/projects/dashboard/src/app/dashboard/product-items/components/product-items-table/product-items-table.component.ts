import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProductItem, Page } from '@inv/core';

@Component({
  selector: 'inv-product-items-table',
  templateUrl: './product-items-table.component.html',
  styleUrls: ['./product-items-table.component.scss']
})
export class ProductItemsTableComponent implements OnInit {
  
  @Input()
  public page: Page<ProductItem>;

  @Output()
  public onPageChange: EventEmitter<number>;

  @Output()
  public onDeleteProductItem: EventEmitter<ProductItem>;

  @Output()
  public onEditProductItem: EventEmitter<ProductItem>;

  constructor() {
    this.onPageChange = new EventEmitter<number>();
    this.onDeleteProductItem = new EventEmitter<ProductItem>();
    this.onEditProductItem = new EventEmitter<ProductItem>();
  }

  ngOnInit(): void {
    
  } 
  
  public pageChange(pageNumber: number) {
    this.onPageChange.emit(pageNumber);
  }

  public deleteProductItem(product: ProductItem): void {
    this.onDeleteProductItem.emit(product);
  }

  public editProductItem(product: ProductItem): void {
    this.onEditProductItem.emit(product);
  }
}