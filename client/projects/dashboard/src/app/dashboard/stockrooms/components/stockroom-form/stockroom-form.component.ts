import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Location, Stockroom, ResponseMessage } from '@inv/core';

@Component({
  selector: 'inv-stockroom-form',
  templateUrl: './stockroom-form.component.html',
  styleUrls: ['./stockroom-form.component.scss']
})
export class StockroomFormComponent {
  @Input()
  public alertMessage: ResponseMessage

  @Output()
  public onSaveStockroom: EventEmitter<Stockroom>;
  public form: FormGroup;
  public locations: FormArray;

  constructor(private _formBuilder: FormBuilder) {
    this.onSaveStockroom = new EventEmitter<Stockroom>();
    this.locations = this._formBuilder.array([]);
    this.form = this._formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      hasStockroomLocations: [false]
    });
  }

  @Input()
  public set formValue(stockroom: Stockroom) {
    this.form.patchValue(stockroom);
    if (stockroom.locations && stockroom.locations.length > 0) {
      this._patchStockroomLocations(stockroom.locations);
    }
  }

  public submitForm(stockroom: Stockroom): void {
    this._validateFormGroup(this.form);
    if (this.form.invalid) return;
    this.onSaveStockroom.emit(stockroom);
  }

  public resetForm(): void {
    if (this.form)
      this.form.reset();
  }

  public addStockroomLocation(location?: Location): void {
    this.locations.push(
      this._formBuilder.group({
        id: [(location ? location.id : '')],
        description: [(location ? location.description : ''), [Validators.required]]
      })
    );
  }

  public removeStockroomLocation(index: number): void {
    const locations: FormArray = this.form.get('locations') as FormArray;
    if (this.locations.length > 1) {
      this.locations.removeAt(index);
    }
  }

  public onAddStockroomLocationsChange(event?): void {
    if (this.form.value.hasStockroomLocations) {
      this.form.addControl('locations', this.locations);
      if (this.locations.controls.length === 0) {
        this.addStockroomLocation();
      }
    } else {
      this.form.removeControl('locations');
    }
  }

  private _validateFormGroup(group: FormGroup): void {
    for (const i in group.controls) {
      if (group.controls[i] instanceof FormArray) {
        const formArray: FormArray = group.controls[i] as FormArray;
        this._validateFormArray(formArray);
      } else {
        group.controls[i].markAsDirty();
        group.controls[i].updateValueAndValidity();
      }
    }
  }

  private _validateFormArray(array: FormArray): void {
    for (const i in array.controls) {
      const formGroup: FormGroup = array.controls[i] as FormGroup;
      this._validateFormGroup(formGroup);
    }
  }

  private _patchStockroomLocations(locations: Location[]): void {
    if (locations && locations.length > 0) {
      this.form.get('hasStockroomLocations').patchValue(true);
      this.form.addControl('locations', this.locations);
      locations.forEach(e => this.addStockroomLocation(e));      
    } else {
      this.form.get('hasStockroomLocations').patchValue(false);
      this.form.removeControl('locations');
    }
  }
}
