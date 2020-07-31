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

  constructor() {
    this.onPageChange = new EventEmitter<number>();
  }

  ngOnInit(): void {
    
  } 
  
  public pageChange(pageNumber: number) {
    this.onPageChange.emit(pageNumber);
  }

  public deleteProductItem(product: ProductItem): void {
    console.log("deleting product item: ", product);
  }
}