import { Component, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { State, STATES } from '@dashboard/shared/data';

@Component({
  selector: 'inv-registration-address-form',
  templateUrl: './registration-address-form.component.html',
  styleUrls: ['./registration-address-form.component.scss']
})
export class RegistrationAddressFormComponent implements OnInit {
  public form: FormGroup;
  public states: State[]; 

  constructor(private _parentControl: ControlContainer) {
    this.states = STATES;
  }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup
  }
}
