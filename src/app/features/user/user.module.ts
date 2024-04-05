import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { UiModule } from 'src/app/ui/ui.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserListingComponent,
    AddEditUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UiModule,
    SharedModule
  ],
  exports: [
    UiModule,
    SharedModule,
  ]
})
export class UserModule { }
