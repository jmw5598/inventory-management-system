import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { SharedModule } from '@dashboard/shared/shared.module';
import { AccountDetailsFormComponent } from './components/account-details-form/account-details-form.component';
import { AccountProfileFormComponent } from './components/account-profile-form/account-profile-form.component';
import { AccountAddressFormComponent } from './components/account-address-form/account-address-form.component';
import { AccountComponent } from './account.component';
import { AccountProfileComponent } from './pages/account-profile/account-profile.component';
import { AccountOverviewComponent } from './pages/account-overview/account-overview.component';

@NgModule({
  declarations: [
    AccountDetailsComponent, 
    AccountDetailsFormComponent, 
    AccountProfileFormComponent, 
    AccountAddressFormComponent, 
    AccountComponent, 
    AccountProfileComponent, 
    AccountOverviewComponent
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class AccountModule { }
