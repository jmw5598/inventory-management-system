import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ProductItemsRoutingModule } from './product-items-routing.module';
import { CreateProductItemComponent } from './pages/create-product-item/create-product-item.component';
import { UpdateProductItemComponent } from './pages/update-product-item/update-product-item.component';
import { ManageProductItemsComponent } from './pages/manage-product-items/manage-product-items.component';
import { ProductItemsTableComponent } from './components/product-items-table/product-items-table.component';

@NgModule({
  declarations: [
    CreateProductItemComponent, 
    UpdateProductItemComponent, 
    ManageProductItemsComponent, 
    ProductItemsTableComponent
  ],
  imports: [
    CommonModule,
    ProductItemsRoutingModule,
    SharedModule
  ]
})
export class ProductItemsModule { }
