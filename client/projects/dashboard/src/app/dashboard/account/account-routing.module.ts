import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountDetailsComponent } from './pages/account-details/account-details.component';

const routes: Routes = [
  {
    path: 'details',
    component: AccountDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
