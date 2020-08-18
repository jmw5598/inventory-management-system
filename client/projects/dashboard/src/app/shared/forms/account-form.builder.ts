import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountValidators } from '@inv/core';

export const buildAccountFormGroup = (
    formBuilder: FormBuilder,
    accountValidators: AccountValidators): FormGroup => {
  return formBuilder.group({
    plan: ['', [Validators.required]]
  });
}
