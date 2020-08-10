import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountValidators, MatchValidators } from '@inv/core';

export const buildRegistrationAccountFormGroup = (
    formBuilder: FormBuilder,
    accountValidators: AccountValidators): FormGroup => {
  return formBuilder.group({
    plan: ['', [Validators.required]]
  });
}
