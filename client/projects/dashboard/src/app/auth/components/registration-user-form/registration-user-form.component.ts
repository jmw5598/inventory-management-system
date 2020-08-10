import { Component, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'inv-registration-user-form',
  templateUrl: './registration-user-form.component.html',
  styleUrls: ['./registration-user-form.component.scss']
})
export class RegistrationUserFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }
}
