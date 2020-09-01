import { Component, OnInit, } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';

import { ProductItem, Category } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { setSelectedProductItemFromSearch } from '@dashboard/core/store/actions';
import { selectSelectedProductItemFromSearch, selectCategories } from '@dashboard/core/store/selectors';

@Component({
  selector: 'inv-step-product-item',
  templateUrl: './step-product-item.component.html',
  styleUrls: ['./step-product-item.component.scss']
})
export class StepProductItemComponent implements OnInit {
  public form: FormGroup;
  public categories$: Observable<Category[]>;
  public selectedProductItemFromSearch$: Observable<ProductItem>;

  constructor(
    private _store: Store<IAppState>,
    private _parentControl: ControlContainer
  ) {
    this.form = this._parentControl.control as FormGroup;
  }

  ngOnInit(): void {
    this.categories$ = this._store.select(selectCategories);
    this.selectedProductItemFromSearch$ = this._store.select(selectSelectedProductItemFromSearch)
      .pipe(
        tap((productItem: ProductItem) => {
          if (productItem) {
            this.form.get('productItem').patchValue(productItem);
            this.form.get('isNewProductItem').patchValue(false);
          } else {
            this.form.get('productItem').reset();
            this.form.get('isNewProductItem').patchValue(true);
          }
        })
      );
  }

  public onTabChange(value: NzTabChangeEvent): void {
    this._store.dispatch(setSelectedProductItemFromSearch(null));
  }

  public onProductItemSelection(productItem: ProductItem): void {
    this._store.dispatch(setSelectedProductItemFromSearch(productItem));
  }

  public onProductItemDeselection(productItem: ProductItem): void {
    this._store.dispatch(setSelectedProductItemFromSearch(productItem));
  }
}
