import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPaawordComponent } from './components/forgot-paaword/forgot-paaword.component';
import { SharedModule } from '../shared/shared.module';
import { NgOtpInputModule } from  'ng-otp-input';
import { UiModule } from '../ui/ui.module';
import { ButtonFieldComponent } from "../shared/dynmic-form/component/button-field/button-field.component";



@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        ForgotPaawordComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        NgOtpInputModule,
        UiModule,
        ButtonFieldComponent
    ],
})
export class AuthModule { constructor(){
    console.log('AuthModule');
  }}
