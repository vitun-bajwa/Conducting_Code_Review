import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPaawordComponent } from './components/forgot-paaword/forgot-paaword.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPaawordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
