import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category, ProductItem, ResponseMessage } from '@inv/core';

@Component({
  selector: 'inv-product-item-form',
  templateUrl: './product-item-form.component.html',
  styleUrls: ['./product-item-form.component.scss']
})
export class ProductItemFormComponent implements OnInit {
  @Input()
  public categories: Category[];

  @Input()
  public alertMessage: ResponseMessage;

  @Output()
  public onSaveProductItem: EventEmitter<ProductItem>;
  public product: ProductItem;
  public form: FormGroup;

  constructor(private _formBuiler: FormBuilder) {
    this.onSaveProductItem = new EventEmitter<ProductItem>();
    this.form = this._formBuiler.group({
      id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      sku: [''],
      make: [''],
      model: [''],
      category: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  @Input()
  public set formValue(product: ProductItem) {
    this.product = product;
    this.form.patchValue(product);
    this.form.get('category').patchValue(product.category);
  }

  public onCategoryCompare(category1: Category, category2: Category): boolean {
    if (category1 && category2) {
      return category1.id === category2.id
    } else {
      return false;
    } 
  }

  public submitForm(product: any): void {
    this._validateFormGroup(this.form);
    if (this.form.invalid) return;
    this.onSaveProductItem.emit(product);
  }

  public resetForm(): void {
    if (this.form)
      this.form.reset();
  }

  private _validateFormGroup(group: FormGroup): void {
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
      group.controls[i].updateValueAndValidity();
    }
  }
}
