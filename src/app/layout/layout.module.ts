import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { UiModule } from '../ui/ui.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    UiModule
  ]
})
export class LayoutModule {constructor(){
} }
