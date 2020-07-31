import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category, ProductItem } from '@inv/core';

@Component({
  selector: 'inv-product-item-form',
  templateUrl: './product-item-form.component.html',
  styleUrls: ['./product-item-form.component.scss']
})
export class ProductItemFormComponent implements OnInit {
  @Input()
  public categories: Category[];

  @Output()
  public onSaveProductItem: EventEmitter<ProductItem>;
  public form: FormGroup;

  constructor(private _formBuiler: FormBuilder) {
    this.onSaveProductItem = new EventEmitter<ProductItem>();
    this.form = this._formBuiler.group({
      id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      sku: [''],
      brand: [''],
      model: [''],
      category: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  @Input()
  public set formValue(product: ProductItem) {
    this.form.patchValue(product);
  }

  submitForm(product: ProductItem): void {
    this._validateFormGroup(this.form);
    if (this.form.invalid) return;
    this.onSaveProductItem.emit(product);
    console.log('form: ', product);
  }

  private _validateFormGroup(group: FormGroup): void {
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
      group.controls[i].updateValueAndValidity();
    }
  }
}
