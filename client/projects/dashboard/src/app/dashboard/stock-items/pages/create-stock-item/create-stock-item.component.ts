import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';

import { ProductItem, Category, ItemCondition, Stockroom, Location } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectSelectedProductItemFromSearch, selectCategories, selectItemConditions, selectCurrentStockrooms } from '@dashboard/core/store/selectors';
import { setSelectedProductItemFromSearch } from '@dashboard/core/store/actions';
import { buildProductItemFormGroup, buildStockItemFormGroup } from '@dashboard/shared/forms';

@Component({
  selector: 'inv-create-stock-item',
  templateUrl: './create-stock-item.component.html',
  styleUrls: ['./create-stock-item.component.scss']
})
export class CreateStockItemComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  public selectedProductItemFromSearch$: Observable<ProductItem>;
  public categories$: Observable<Category[]>;
  public itemConditions$: Observable<ItemCondition[]>;
  public stockrooms$: Observable<Stockroom[]>;
  public form: FormGroup;
  
  constructor(
    private _store: Store<IAppState>,
    private _formBuilder: FormBuilder
  ) {
    this._subscriptionSubject = new Subject<void>();
    this.form = this._formBuilder.group({
      isNewProductItem: [false, [Validators.required]],
      productItem: buildProductItemFormGroup(this._formBuilder),
      stockItem: buildStockItemFormGroup(this._formBuilder)
    });
  }

  ngOnInit(): void {
    this.categories$ = this._store.select(selectCategories);
    this.itemConditions$ = this._store.select(selectItemConditions);
    this.stockrooms$ = this._store.select(selectCurrentStockrooms);
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

  public onSubmit(value: any): void {
    console.log(value);
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

  ngOnDestroy() {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
