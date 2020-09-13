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
      Validators.pattern(/^[\d]{1,}[.]?[\d]{0,}$/)
    ]],
    quantity: ['', [
      Validators.required, 
      Validators.min(1),
      Validators.pattern(/^[\d]{1,}$/)
    ]],
    itemConditionId: ['', [
      Validators.required
    ]],
    stockroomId: ['', [
      Validators.required
    ]],
    locationId: []
  });
};
