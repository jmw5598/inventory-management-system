import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { Plan } from '@inv/core';

@Component({
  selector: 'inv-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: ['./account-details-form.component.scss']
})
export class AccountDetailsFormComponent implements OnInit {
  @Input()
  public plans: Plan[];
  public form: FormGroup;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }

  public onPlanCompare(plan1: Plan, plan2: Plan): boolean {
    if (plan1 && plan2) {
      return plan1.id === plan2.id
    } else {
      return false;
    } 
  }
}
