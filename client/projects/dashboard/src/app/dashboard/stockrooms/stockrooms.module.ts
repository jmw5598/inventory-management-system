import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStockroomsComponent } from './pages/manage-stockrooms/manage-stockrooms.component';
import { StockroomDetailsComponent } from './pages/stockroom-details/stockroom-details.component';
import { StockroomsRoutingModule } from './stockrooms-routing.module';
import { StockroomsTableComponent } from './components/stockrooms-table/stockrooms-table.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateStockroomModalComponent } from './components/create-stockroom-modal/create-stockroom-modal.component';
import { UpdateStockroomModalComponent } from './components/update-stockroom-modal/update-stockroom-modal.component';

@NgModule({
  declarations: [
    ManageStockroomsComponent,
    StockroomDetailsComponent,
    StockroomsTableComponent,
    CreateStockroomModalComponent,
    UpdateStockroomModalComponent
 ],
  imports: [
    CommonModule,
    StockroomsRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    UpdateStockroomModalComponent
  ]
})
export class StockroomsModule { }
