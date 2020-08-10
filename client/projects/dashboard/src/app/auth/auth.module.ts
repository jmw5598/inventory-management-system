import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { AuthMarketingComponent } from './components/auth-marketing/auth-marketing.component';
import { RegistrationAccountFormComponent } from './components/registration-account-form/registration-account-form.component';
import { RegistrationUserFormComponent } from './components/registration-user-form/registration-user-form.component';
import { RegistrationProfileFormComponent } from './components/registration-profile-form/registration-profile-form.component';
import { RegistrationAddressFormComponent } from './components/registration-address-form/registration-address-form.component';
import { RegistrationResultComponent } from './components/registration-result/registration-result.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthMarketingComponent,
    RegistrationAccountFormComponent,
    RegistrationUserFormComponent,
    RegistrationProfileFormComponent,
    RegistrationAddressFormComponent,
    RegistrationResultComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class AuthModule { }
