import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@dashboard/shared/shared.module';

import { CreateStockItemComponent } from './pages/create-stock-item/create-stock-item.component';
import { EditStockItemComponent } from './pages/edit-stock-item/edit-stock-item.component';
import { ManageStockItemsComponent } from './pages/manage-stock-items/manage-stock-items.component';
import { ProductItemSelectionComponent } from './components/product-item-selection/product-item-selection.component';
import { StockItemsRoutingModule } from './stock-items-routing.module';
import { ProductItemSearchComponent } from './components/product-item-search/product-item-search.component';
import { CreateStockItemModalComponent } from './components/create-stock-item-modal/create-stock-item-modal.component';
import { StepStockItemComponent } from './components/step-stock-item/step-stock-item.component';
import { StepProductItemComponent } from './components/step-product-item/step-product-item.component';

@NgModule({
  declarations: [
    CreateStockItemComponent,
    EditStockItemComponent,
    ManageStockItemsComponent,
    ProductItemSelectionComponent,
    ProductItemSearchComponent,
    CreateStockItemModalComponent,
    StepStockItemComponent,
    StepProductItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StockItemsRoutingModule,
  ]
})
export class StockItemsModule { }
