import { Component, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { State, STATES } from '@dashboard/shared/data';

@Component({
  selector: 'inv-account-address-form',
  templateUrl: './account-address-form.component.html',
  styleUrls: ['./account-address-form.component.scss']
})
export class AccountAddressFormComponent implements OnInit {
  public states: State[];
  public form: FormGroup;

  constructor(private _parentControl: ControlContainer) {
    this.states = STATES;
  }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }
}
