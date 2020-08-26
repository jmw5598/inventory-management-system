import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from './nz-modules.module';
import { ProductItemFormComponent } from './forms/product-item-form/product-item-form.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StockItemFormComponent } from './forms/stock-item-form/stock-item-form.component';
import { StockItemsTableComponent } from './components/stock-items-table/stock-items-table.component';
import { StockroomFormComponent } from './forms/stockroom-form/stockroom-form.component';

@NgModule({
  declarations: [
    ProductItemFormComponent,
    SpinnerComponent,
    StockItemFormComponent,
    StockItemsTableComponent,
    StockroomFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    NgZorroModule,
    ProductItemFormComponent,
    ReactiveFormsModule,
    SpinnerComponent,
    StockItemFormComponent,
    StockItemsTableComponent,
    StockroomFormComponent
  ]
})
export class SharedModule { }
