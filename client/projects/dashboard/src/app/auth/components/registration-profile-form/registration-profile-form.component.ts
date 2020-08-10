import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ControlContainer } from '@angular/forms';
import { AccountValidators, checkFormGroupValidity } from '@inv/core';

@Component({
  selector: 'inv-registration-profile-form',
  templateUrl: './registration-profile-form.component.html',
  styleUrls: ['./registration-profile-form.component.scss']
})
export class RegistrationProfileFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }
}
