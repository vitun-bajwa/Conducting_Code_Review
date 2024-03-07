import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPaawordComponent } from './components/forgot-paaword/forgot-paaword.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignUpComponent
  },
  {
    path:'forgot',
    component: ForgotPaawordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
