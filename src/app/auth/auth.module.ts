import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPaawordComponent } from './components/forgot-paaword/forgot-paaword.component';
import { SharedModule } from '../shared/shared.module';
import { DynamicFormModule } from "../shared/dynmic-form/dynamic-form.module";


@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        ForgotPaawordComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule
    ]
})
export class AuthModule { }
