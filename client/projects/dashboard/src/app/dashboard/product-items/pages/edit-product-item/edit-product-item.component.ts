import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../core/store/state/app.state';
import { Category, ProductItem } from '@inv/core';
import { selectSelectedProductItem } from '../../../../core/store/selectors/product-item-selector';
import { selectCategories } from 'projects/dashboard/src/app/core/store/selectors/category.selector';
import { updateProductItem } from 'projects/dashboard/src/app/core/store/actions/product-item.actions';

@Component({
  selector: 'inv-edit-product-item',
  templateUrl: './edit-product-item.component.html',
  styleUrls: ['./edit-product-item.component.scss']
})
export class EditProductItemComponent implements OnInit {
  public selectedProductItem$: Observable<ProductItem>;
  public categories$: Observable<Category[]>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.selectedProductItem$ = this._store.select(selectSelectedProductItem); 
    this.categories$ = this._store.select(selectCategories);
  }

  public onSaveProductItem(product: ProductItem): void {
    this._store.dispatch(updateProductItem({ id: product.id, product: product }));
  }
}
