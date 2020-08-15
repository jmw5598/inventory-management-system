import { Component, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

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
