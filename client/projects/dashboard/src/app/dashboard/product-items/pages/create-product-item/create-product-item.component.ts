import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProductItem, Category } from '@inv/core';
import { IAppState } from '../../../../core/store/state/app.state';
import { createProductItem } from '../../../../core/store/actions/product-item.actions';
import { selectCategories } from '../../../../core/store/selectors/category.selector';

@Component({
  selector: 'inv-create-product-item',
  templateUrl: './create-product-item.component.html',
  styleUrls: ['./create-product-item.component.scss']
})
export class CreateProductItemComponent implements OnInit {
  public categories$: Observable<Category[]>

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.categories$ = this._store.select(selectCategories);
  }

  public onSaveProductItem(product: ProductItem): void {
    this._store.dispatch(createProductItem(product));
  }
}
