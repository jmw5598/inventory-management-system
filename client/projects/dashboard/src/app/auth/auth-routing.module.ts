import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full' 
      }
    ]
  }
]; 

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
