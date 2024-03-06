import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UiModule } from 'src/app/ui/ui.module';


@NgModule({
  declarations: [
    UserListingComponent,
    UserViewComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    UiModule
  ]
})
export class AdministratorModule { }
