import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { UserViewComponent } from './components/user-view/user-view.component';

const routes: Routes = [
  {
    path:'admin',
    component: UserListingComponent
    
  },
  {
    path:'admin/view',
    component: UserViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
