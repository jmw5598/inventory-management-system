import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { PlansGuard } from '@dashboard/core/guards';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { PasswordRequestComponent } from './pages/password-request/password-request.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
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
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'password-request',
        component: PasswordRequestComponent
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent
      },
      {
        path: 'register',
        canActivate: [PlansGuard],
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
