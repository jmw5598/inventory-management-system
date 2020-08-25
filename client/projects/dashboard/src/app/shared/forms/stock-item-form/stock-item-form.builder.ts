import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export const buildStockItemFormGroup = (formBuilder: FormBuilder) => {
  return formBuilder.group({
    id: [],
    purchaseDate: ['', [Validators.required]],
    purchasePrice: ['', [Validators.required, Validators.min(0)]],
    quantity: ['', [Validators.required, Validators.min(1)]],
    itemCondition: ['', [Validators.required]],
    stockroom: ['', [Validators.required]],
    location: []
  });
};
