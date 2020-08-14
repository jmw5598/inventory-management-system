import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { StockItem, Page } from '@inv/core';

@Component({
  selector: 'inv-stock-items-table',
  templateUrl: './stock-items-table.component.html',
  styleUrls: ['./stock-items-table.component.scss']
})
export class StockItemsTableComponent implements OnInit {
  @Input()
  public page: Page<StockItem>;

  @Output()
  public onPageChange: EventEmitter<number>;

  @Output()
  public onDeleteStockItem: EventEmitter<StockItem>;

  constructor() {
    this.onPageChange = new EventEmitter<number>();
    this.onDeleteStockItem = new EventEmitter<StockItem>();
  }

  ngOnInit(): void {
  }

  public pageChange(pageNumber: number): void {
    this.onPageChange.emit(pageNumber);
  }

  public deleteStockItem(item: StockItem): void {
    this.onDeleteStockItem.emit(item);
  }
}
