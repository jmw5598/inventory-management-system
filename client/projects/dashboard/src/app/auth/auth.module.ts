import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { NgZorroModule } from '../nz-modules.module';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    LogoutComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    NgZorroModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
