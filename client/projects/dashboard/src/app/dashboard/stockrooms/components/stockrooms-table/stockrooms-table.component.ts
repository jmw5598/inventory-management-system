import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stockroom, StockroomSummary } from '@inv/core';

@Component({
  selector: 'inv-stockrooms-table',
  templateUrl: './stockrooms-table.component.html',
  styleUrls: ['./stockrooms-table.component.scss']
})
export class StockroomsTableComponent implements OnInit {
  @Input()
  public summaries: StockroomSummary[];

  @Output()
  public onDeleteStockroom: EventEmitter<number>;
  
  constructor() {
    this.onDeleteStockroom = new EventEmitter<number>();
  }

  deleteStockroom(stockroom: Stockroom): void {
    this.onDeleteStockroom.emit(stockroom.id);
  }

  ngOnInit(): void {
  }
}
