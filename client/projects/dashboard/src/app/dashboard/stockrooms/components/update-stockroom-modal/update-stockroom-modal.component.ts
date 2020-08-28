import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, take, filter } from 'rxjs/operators';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { Location, ResponseMessage, Stockroom } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { buildStockroomFormGroup } from '@dashboard/shared/forms';
import { updateStockroom, setUpdateStockroomResponseMessage, setSelectedStockroom } from '@dashboard/core/store/actions';
import { selectSelectedStockroom, selectUpdateStockroomResponseMessage } from '@dashboard/core/store/selectors';
import { buildLocationFormGroup } from '@dashboard/shared/forms';

export interface UpdateStockroomModalCloseResponse {
  hasStockroomsBeenUpdated: boolean
}

@Component({
  selector: 'inv-update-stockroom-modal',
  templateUrl: './update-stockroom-modal.component.html',
  styleUrls: ['./update-stockroom-modal.component.scss']
})
export class UpdateStockroomModalComponent implements OnInit {
  public form: FormGroup;
  public createStockroomResponseMessage$: Observable<ResponseMessage>;
  private _hasStockroomsBeenUpdated: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private _modal: NzModalRef
  ) {
    this.form = this._formBuilder.group({
      stockroom: buildStockroomFormGroup(this._formBuilder)
    });
  }

  ngOnInit(): void {
    this._hasStockroomsBeenUpdated = false;
    this.createStockroomResponseMessage$ = this._store.select(selectUpdateStockroomResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            setTimeout(() => this._store.dispatch(setUpdateStockroomResponseMessage(null)), 3000);
          }
        })
      )

      this._store.select(selectSelectedStockroom)
        .pipe(
          filter((stockroom: Stockroom) => !!stockroom),
          tap((stockroom: Stockroom) => this._patchStockroomToForm(stockroom)),
          take(1)
        ).subscribe();
  }

  public onSubmit(formValue: { stockroom: Stockroom }): void {
    this._hasStockroomsBeenUpdated = true;
    const stockroom: Stockroom = formValue.stockroom;
    this._store.dispatch(updateStockroom({
      id: stockroom.id,
      stockroom: stockroom 
    }));
  }

  public onCloseModal(): void {
    this._store.dispatch(setSelectedStockroom(null));
    this._modal.destroy({
      hasStockroomsBeenUpdated: this._hasStockroomsBeenUpdated
    } as UpdateStockroomModalCloseResponse);
  }

  private _patchStockroomToForm(stockroom: Stockroom): void {
    const locations: Location[] = stockroom.locations;
    const stockroomFormGroup: FormGroup = this.form.get('stockroom') as FormGroup;
    const locationsFormArray: FormArray = stockroomFormGroup.get('locations') as FormArray;
    this.form.get('stockroom').patchValue({
      id: stockroom.id,
      name: stockroom.name,
      description: stockroom.description
    });
    this._patchLocationsToForm(locations);
  }

  private _patchLocationsToForm(locations: Location[]): void {
    const stockroomFormGroup: FormGroup = this.form.get('stockroom') as FormGroup;
    const locationsFormArray: FormArray = stockroomFormGroup.get('locations') as FormArray;
    if (locations && locations.length > 0) {
      locations.forEach((location: Location) => {
        const locationFormGroup: FormGroup = buildLocationFormGroup(this._formBuilder);
        locationFormGroup.patchValue(location);
        locationsFormArray.push(locationFormGroup);
      })
      stockroomFormGroup.get('hasStockroomLocations').patchValue(true);
    }
    stockroomFormGroup.addControl('locations', locationsFormArray);
  }
}
