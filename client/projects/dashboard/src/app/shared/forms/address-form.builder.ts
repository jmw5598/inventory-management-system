import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountValidators } from '@inv/core';

export const buildAddressFormGroup = (
    formBuilder: FormBuilder,
    accountValidators: AccountValidators): FormGroup => {
  return formBuilder.group({
    street: ['', [Validators.required]],
    street2: [''],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required]]
  });;
}