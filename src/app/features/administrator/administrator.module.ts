import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UiModule } from 'src/app/ui/ui.module';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { UserViewComponent } from './components/user-view/user-view.component';


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
