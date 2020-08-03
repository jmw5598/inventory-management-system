import { Component, OnInit } from '@angular/core';
import { StockItem } from '@inv/core';

@Component({
  selector: 'inv-edit-stock-item',
  templateUrl: './edit-stock-item.component.html',
  styleUrls: ['./edit-stock-item.component.scss']
})
export class EditStockItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onUpdateStockItem(item: StockItem): void {
    console.log("saving edits for ", item);
  }
}
