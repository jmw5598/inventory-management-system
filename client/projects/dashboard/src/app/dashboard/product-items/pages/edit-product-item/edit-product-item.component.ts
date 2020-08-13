import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IAppState } from '../../../../core/store/state/app.state';
import { Category, ProductItem, ResponseMessage } from '@inv/core';
import { selectSelectedProductItem, selectUpdateProductItemResponseMessage } from '../../../../core/store/selectors/product-item-selector';
import { selectCategories } from 'projects/dashboard/src/app/core/store/selectors/category.selector';
import { updateProductItem, setUpdateProductItemResponseMessage } from 'projects/dashboard/src/app/core/store/actions/product-item.actions';

@Component({
  selector: 'inv-edit-product-item',
  templateUrl: './edit-product-item.component.html',
  styleUrls: ['./edit-product-item.component.scss']
})
export class EditProductItemComponent implements OnInit {
  public editResponseMessage: ResponseMessage;
  public selectedProductItem$: Observable<ProductItem>;
  public updateProductItemResponseMessage$: Observable<ResponseMessage>;
  public categories$: Observable<Category[]>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.categories$ = this._store.select(selectCategories);
    this.selectedProductItem$ = this._store.select(selectSelectedProductItem);
    this.updateProductItemResponseMessage$ = this._store.select(selectUpdateProductItemResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            setTimeout(() => this._store.dispatch(setUpdateProductItemResponseMessage(null)), 3000);
          }
        })
      )
  }

  public onSaveProductItem(product: ProductItem): void {
    this._store.dispatch(updateProductItem({ id: product.id, product: product }));
  }
}
