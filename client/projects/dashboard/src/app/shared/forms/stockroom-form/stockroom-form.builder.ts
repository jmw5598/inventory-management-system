import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export const buildStockroomFormGroup = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    plan: ['', [Validators.required]]
  });
}
