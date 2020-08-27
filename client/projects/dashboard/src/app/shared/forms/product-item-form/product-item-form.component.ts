import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { Category, ProductItem } from '@inv/core';

@Component({
  selector: 'inv-shared-product-item-form',
  templateUrl: './product-item-form.component.html',
  styleUrls: ['./product-item-form.component.scss']
})
export class ProductItemFormComponent implements OnInit {
  @Input()
  public categories: Category[];
  public form: FormGroup;

  constructor(private _parentControl: ControlContainer) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as FormGroup;
  }

  public onCompareProductItems(category1: Category, category2: Category): boolean {
    if (!category1 || !category2) return false;
    return category1.id === category2.id;
  }
}
