import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export const buildStockItemFormGroup = (formBuilder: FormBuilder) => {
  return formBuilder.group({
    id: [],
    purchaseDate: ['', [
      Validators.required
    ]],
    purchasePrice: ['', [
      Validators.required, 
      Validators.min(0), 
      Validators.pattern(/^[\d]{1,}[.]?[\d]{1,}$/)
    ]],
    quantity: ['', [
      Validators.required, 
      Validators.min(1),
      Validators.pattern(/^[\d]{1,}$/)
    ]],
    itemCondition: ['', [
      Validators.required
    ]],
    stockroom: ['', [
      Validators.required
    ]],
    location: []
  });
};
