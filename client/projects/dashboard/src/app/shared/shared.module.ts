import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from '../nz-modules.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StockItemsTableComponent } from './components/stock-items-table/stock-items-table.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    StockItemsTableComponent
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
    ReactiveFormsModule,
    SpinnerComponent,
    StockItemsTableComponent
  ]
})
export class SharedModule { }
