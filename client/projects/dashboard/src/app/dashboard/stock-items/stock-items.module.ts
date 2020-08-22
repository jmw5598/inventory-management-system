import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@dashboard/shared/shared.module';

import { CreateStockItemComponent } from './pages/create-stock-item/create-stock-item.component';
import { EditStockItemComponent } from './pages/edit-stock-item/edit-stock-item.component';
import { ManageStockItemsComponent } from './pages/manage-stock-items/manage-stock-items.component';
import { ProductItemFormComponent } from './components/product-item-form/product-item-form.component';
import { ProductItemSelectionComponent } from './components/product-item-selection/product-item-selection.component';
import { StockItemFormComponent } from './components/stock-item-form/stock-item-form.component';
import { StockItemsRoutingModule } from './stock-items-routing.module';
import { ProductItemSearchComponent } from './components/product-item-search/product-item-search.component';

@NgModule({
  declarations: [
    CreateStockItemComponent,
    EditStockItemComponent,
    ManageStockItemsComponent,
    ProductItemFormComponent,
    ProductItemSelectionComponent,
    StockItemFormComponent,
    ProductItemSearchComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StockItemsRoutingModule,
  ]
})
export class StockItemsModule { }
