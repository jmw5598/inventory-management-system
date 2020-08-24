import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { Stockroom, ItemCondition, Location } from '@inv/core';

@Component({
  selector: 'inv-stock-item-form',
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

  public onStockroomChange(stockroom: Stockroom): void {
    this.form.get('stockItem').get('location').reset();
    this.locations = stockroom.locations;
  }
}
