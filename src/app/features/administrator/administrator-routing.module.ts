import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { UserViewComponent } from './components/user-view/user-view.component';

const routes: Routes = [
  {
    path:'users',
    component: UserListingComponent
  },
  {
    path:'users/add',
    component: AddEditUserComponent
  },
  {
    path:'users/view',
    component: UserViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
