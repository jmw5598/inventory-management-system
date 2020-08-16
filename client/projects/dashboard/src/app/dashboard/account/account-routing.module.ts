import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsGuard, AccountProfileGuard } from '@dashboard/core/guards';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';

const routes: Routes = [
  {
    path: 'details',
    canActivate: [AccountDetailsGuard, AccountProfileGuard],
    component: AccountDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
