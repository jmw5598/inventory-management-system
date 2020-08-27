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

  @Output()
  public onEditStockroom: EventEmitter<Stockroom>;
  
  constructor() {
    this.onDeleteStockroom = new EventEmitter<number>();
    this.onEditStockroom = new EventEmitter<Stockroom>();
  }

  deleteStockroom(stockroom: Stockroom): void {
    this.onDeleteStockroom.emit(stockroom.id);
  }

  editStockroom(stockroom: Stockroom): void {
    this.onEditStockroom.emit(stockroom);
  }

  ngOnInit(): void {
  }
}
