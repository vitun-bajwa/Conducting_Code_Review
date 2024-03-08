import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'src/app/auth/components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignUpComponent
  },
  {
    path:'forgot',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
