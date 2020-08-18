import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountValidators } from '@inv/core';
import { buildAddressFormGroup } from './address-form.builder';

export const buildProfileFormGroup = (
    formBuilder: FormBuilder,
    accountValidators: AccountValidators): FormGroup => {
  return formBuilder.group({
    firstName: ['', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z\s]{3,20}$/)
    ]],
    lastName: ['', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z\s]{3,20}$/)
    ]],
    email: ['', 
      [Validators.required, Validators.email], 
      [accountValidators.validateEmail()]
    ],
    address: buildAddressFormGroup(
      formBuilder,
      accountValidators
    )
  });
};
