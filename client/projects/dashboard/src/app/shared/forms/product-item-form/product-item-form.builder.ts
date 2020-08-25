import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export const buildProductItemFormGroup = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    id: [],
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    sku: [''],
    make: [''],
    model: [''],
    category: ['', [Validators.required]]
  })
};
