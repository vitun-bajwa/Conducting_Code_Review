import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';

const routes: Routes = [
  {
    path:'',
    component: UserListingComponent
    
  },
  {
    path:'add',
    component: AddEditUserComponent
  },
  {
    path:'edit/:id',
    component: AddEditUserComponent
  },
  {
    path: 'view/:id', 
    component:AddEditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
