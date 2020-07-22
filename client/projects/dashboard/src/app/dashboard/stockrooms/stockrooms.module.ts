import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStockroomsComponent } from './pages/manage-stockrooms/manage-stockrooms.component';
import { StockroomDetailsComponent } from './pages/stockroom-details/stockroom-details.component';
import { StockroomsRoutingModule } from './stockrooms-routing.module';
import { StockroomsTableComponent } from './components/stockrooms-table/stockrooms-table.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateStockroomComponent } from './pages/create-stockroom/create-stockroom.component';
import { StockroomFormComponent } from './components/stockroom-form/stockroom-form.component';
import { EditStockroomComponent } from './pages/edit-stockroom/edit-stockroom.component';

@NgModule({
  declarations: [
    ManageStockroomsComponent,
    StockroomDetailsComponent,
    StockroomsTableComponent,
    CreateStockroomComponent,
    StockroomFormComponent,
    EditStockroomComponent
  ],
  imports: [
    CommonModule,
    StockroomsRoutingModule,
    SharedModule,
  ]
})
export class StockroomsModule { }
