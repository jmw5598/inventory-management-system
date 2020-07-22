import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroModule } from '../nz-modules.module';

@NgModule({
  declarations: [],
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
  ]
})
export class SharedModule { }
