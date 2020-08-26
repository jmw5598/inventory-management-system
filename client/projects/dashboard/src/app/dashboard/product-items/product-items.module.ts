import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CreateProductItemModalComponent } from './components/create-product-item-modal/create-product-item-modal.component';
import { ProductItemsRoutingModule } from './product-items-routing.module';
import { ManageProductItemsComponent } from './pages/manage-product-items/manage-product-items.component';
import { ProductItemsTableComponent } from './components/product-items-table/product-items-table.component';
import { EditProductItemComponent } from './pages/edit-product-item/edit-product-item.component';

@NgModule({
  declarations: [
    CreateProductItemModalComponent,
    ManageProductItemsComponent, 
    ProductItemsTableComponent, 
    EditProductItemComponent
  ],
  imports: [
    CommonModule,
    ProductItemsRoutingModule,
    SharedModule
  ],
  entryComponents: [
    CreateProductItemModalComponent
  ]
})
export class ProductItemsModule { }
