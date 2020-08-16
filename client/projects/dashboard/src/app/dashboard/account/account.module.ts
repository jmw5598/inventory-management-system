import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';

@NgModule({
  declarations: [AccountDetailsComponent],
  imports: [
    AccountRoutingModule,
    CommonModule
  ]
})
export class AccountModule { }
