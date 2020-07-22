import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stockroom } from '../../../../core/models/stockroom.model';

@Component({
  selector: 'inv-stockroom-form',
  templateUrl: './stockroom-form.component.html',
  styleUrls: ['./stockroom-form.component.scss']
})
export class StockroomFormComponent implements OnInit {

  @Output()
  public onSaveStockroom: EventEmitter<Stockroom>;
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.onSaveStockroom = new EventEmitter<Stockroom>();
    this.form = this._formBuilder.group({ 
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      locations: this._formBuilder.array([])
    });
  }

  ngOnInit(): void {
  }

  @Input()
  public set formValue(stockroom: Stockroom) {
    this.form.patchValue(stockroom);
  }

  public submitForm(stockroom: Stockroom): void {
    this.onSaveStockroom.emit(stockroom);
  }
}
