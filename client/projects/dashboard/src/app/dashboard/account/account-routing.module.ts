import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsGuard, AccountProfileGuard, PlansGuard } from '@dashboard/core/guards';
import { AccountComponent } from './account.component';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { AccountProfileComponent } from './pages/account-profile/account-profile.component';
import { AccountOverviewComponent } from './pages/account-overview/account-overview.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [AccountDetailsGuard, AccountProfileGuard],
    children: [
      {
        path: 'overview',
        component: AccountOverviewComponent
      },
      {
        path: 'details',
        canActivate: [PlansGuard],
        component: AccountDetailsComponent
      },
      {
        path: 'profile',
        component: AccountProfileComponent
      },
      {
        path: '**',
        redirectTo: 'overview',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
