import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStockroomsComponent } from './pages/manage-stockrooms/manage-stockrooms.component';
import { StockroomDetailsComponent } from './pages/stockroom-details/stockroom-details.component';
import { StockroomsRoutingModule } from './stockrooms-routing.module';

@NgModule({
  declarations: [
    ManageStockroomsComponent,
    StockroomDetailsComponent
  ],
  imports: [
    CommonModule,
    StockroomsRoutingModule
  ]
})
export class StockroomsModule { }
