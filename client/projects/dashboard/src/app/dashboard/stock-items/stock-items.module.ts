import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CreateStockItemComponent } from './pages/create-stock-item/create-stock-item.component';
import { EditStockItemComponent } from './pages/edit-stock-item/edit-stock-item.component';
import { ManageStockItemsComponent } from './pages/manage-stock-items/manage-stock-items.component';
import { StockItemFormComponent } from './components/stock-item-form/stock-item-form.component';
import { StockItemsRoutingModule } from './stock-items-routing.module';

@NgModule({
  declarations: [
    CreateStockItemComponent,
    EditStockItemComponent,
    ManageStockItemsComponent,
    StockItemFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StockItemsRoutingModule,
  ]
})
export class StockItemsModule { }
