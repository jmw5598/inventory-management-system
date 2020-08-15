import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ProductItemFormComponent } from '../../components/product-item-form/product-item-form.component';
import { ProductItem, Category, ResponseMessage } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { createProductItem, setCreateProductItemResponseMessage } from '@dashboard/core/store/actions';
import { selectCreateProductItemResponseMessage, selectCategories } from '@dashboard/core/store/selectors'

@Component({
  selector: 'inv-create-product-item',
  templateUrl: './create-product-item.component.html',
  styleUrls: ['./create-product-item.component.scss']
})
export class CreateProductItemComponent implements OnInit {
  @ViewChild(ProductItemFormComponent, { static: true })
  public formComponent: ProductItemFormComponent;

  public categories$: Observable<Category[]>
  public createProductItemResponseMessage$: Observable<ResponseMessage>

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.categories$ = this._store.select(selectCategories);
    this.createProductItemResponseMessage$ = this._store.select(selectCreateProductItemResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.formComponent.resetForm();
            setTimeout(() => this._store.dispatch(setCreateProductItemResponseMessage(null)), 3000);
          }
        })
      )
  }

  public onSaveProductItem(product: ProductItem): void {
    this._store.dispatch(createProductItem(product));
  }
}
