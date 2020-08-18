import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountValidators, MatchValidators } from '@inv/core';

export const buildUserFormGroup = (
    formBuilder: FormBuilder,
    accountValidators: AccountValidators): FormGroup => {
  return formBuilder.group({
      username: ['', 
        [
          Validators.required, 
          Validators.pattern(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
        ], 
        [accountValidators.validateUsername()]
      ],
      password: ['', [
        Validators.required, 
        Validators.minLength(8)
      ]],
      passwordConfirm: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    }, { 
      validator: MatchValidators.mustMatch('password', 'passwordConfirm')
    });
};
