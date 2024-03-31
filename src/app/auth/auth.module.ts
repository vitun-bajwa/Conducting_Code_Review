import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'src/app/auth/components/forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { NgOtpInputModule } from  'ng-otp-input';
import { UiModule } from '../ui/ui.module';
import { ButtonFieldComponent } from "../shared/dynmic-form/component/button-field/button-field.component";
import { ErrorsComponent } from "../shared/dynmic-form/component/errors/errors.component";

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        ForgotPasswordComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        NgOtpInputModule,
        UiModule,
        ButtonFieldComponent,
        ErrorsComponent
    ]
})
export class AuthModule { constructor(){
  }}
