import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';

const routes: Routes = [
  {
    path:'',
    component: UserListingComponent
    
  },
  {
    path:'view',
    component: UserViewComponent
  },
  {
    path:'add-user',
    component: AddEditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
