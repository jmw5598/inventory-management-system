import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from '../nz-modules.module';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    NgZorroModule,
    ReactiveFormsModule,
    SpinnerComponent,
  ]
})
export class SharedModule { }
