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

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthMarketingComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class AuthModule { }
