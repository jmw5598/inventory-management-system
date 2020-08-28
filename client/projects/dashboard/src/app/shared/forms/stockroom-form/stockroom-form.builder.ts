import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export const buildStockroomFormGroup = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    hasStockroomLocations: [false],
    locations: formBuilder.array([])
  });
}

export const buildLocationFormGroup = (formBuilder: FormBuilder) => {
  return formBuilder.group({
    id: [],
    description: ['', [Validators.required]]
  });
}
