import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { UiModule } from 'src/app/ui/ui.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserListingComponent,
    UserViewComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    UiModule,
    SharedModule
  ],
  exports: [
    UiModule,
    SharedModule,
  ]
})
export class AdministratorModule { }
