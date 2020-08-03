import { Component, OnInit } from '@angular/core';
import { StockItem } from '@inv/core';

@Component({
  selector: 'inv-create-stock-item',
  templateUrl: './create-stock-item.component.html',
  styleUrls: ['./create-stock-item.component.scss']
})
export class CreateStockItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onCreateStockItem(item: StockItem): void {
    console.log("creating ", item);
  }
}
