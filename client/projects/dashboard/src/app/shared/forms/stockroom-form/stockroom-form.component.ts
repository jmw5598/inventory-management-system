import { Component, OnInit } from '@angular/core';
import { 
  AbstractControl, 
  FormBuilder, 
  FormGroup, 
  FormArray, 
  ControlContainer, 
  Validators } from '@angular/forms';
import { Location } from '@inv/core';

@Component({
  selector: 'inv-shared-stockroom-form',
  templateUrl: './stockroom-form.component.html',
  styleUrls: ['./stockroom-form.component.scss']
})
export class StockroomFormComponent implements OnInit {
  public form: FormGroup;
  public locations: FormArray;
  private _locations: Location[];

  constructor(
    private _parentControl: ControlContainer,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
    this.locations = this._formBuilder.array([]);
    this.addStockroomLocation();
  }

  public addStockroomLocation(location?: Location): void {
    const stockroom: FormGroup = this.form.get('stockroom') as FormGroup;
    const locations: FormArray = stockroom.get('locations') as FormArray;
    this.locations.push(
      this._formBuilder.group({
        id: [(location ? location.id : '')],
        description: [(location ? location.description : ''), [Validators.required]]
      })
    );
  }

  public removeStockroomLocation(index: number): void {
    const stockroom: FormGroup = this.form.get('stockroom') as FormGroup;
    const locations: FormArray = stockroom.get('locations') as FormArray;
    if (locations.length > 1) {
      this.locations.removeAt(index);
    }
  }

  public onAddStockroomLocationsChange(event?): void {
    const stockroom: FormGroup = this.form.get('stockroom') as FormGroup;
    if (stockroom.value.hasStockroomLocations) {
      stockroom.addControl('locations', this.locations);
      if (this.locations.controls.length === 0) {
        this.addStockroomLocation();
      }
    } else {
      stockroom.removeControl('locations');
    }
  }

  public getLocationControls(): AbstractControl[] {
    const stockroom: FormGroup = this.form.get('stockroom') as FormGroup;
    const locations: FormArray = stockroom.get('locations') as FormArray;
    return locations.controls;
  }
}
