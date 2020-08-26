import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CreateProductItemModalComponent } from './components/create-product-item-modal/create-product-item-modal.component';
import { ProductItemsRoutingModule } from './product-items-routing.module';
import { ManageProductItemsComponent } from './pages/manage-product-items/manage-product-items.component';
import { ProductItemsTableComponent } from './components/product-items-table/product-items-table.component';
import { UpdateProductItemModalComponent } from './components/update-product-item-modal/update-product-item-modal.component';

@NgModule({
  declarations: [
    CreateProductItemModalComponent,
    ManageProductItemsComponent, 
    ProductItemsTableComponent, 
    UpdateProductItemModalComponent
  ],
  imports: [
    CommonModule,
    ProductItemsRoutingModule,
    SharedModule
  ],
  entryComponents: [
    CreateProductItemModalComponent,
    UpdateProductItemModalComponent
  ]
})
export class ProductItemsModule { }
