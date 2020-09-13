import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { ItemCondition, Stockroom, Location } from '@inv/core';

@Component({
  selector: 'inv-shared-stock-item-form',
  templateUrl: './stock-item-form.component.html',
  styleUrls: ['./stock-item-form.component.scss']
})
export class StockItemFormComponent implements OnInit {
  @Input()
  public stockrooms: Stockroom[];

  @Input()
  public itemConditions: ItemCondition[];
  public locations: Location[];
  public form: FormGroup;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }

  public onStockroomChange(stockroomId: number): void {
    this.form.get('stockItem').get('locationId').reset();
    console.log(stockroomId);
    const stockroom: Stockroom = this.stockrooms.find(e => e.id === stockroomId);
    console.log("found stockroom", stockroom);
    if (stockroom && stockroom.locations) {
      console.log("stockroom is good setting locations", stockroom.locations);
      this.locations = stockroom.locations;
    }
  }
}
