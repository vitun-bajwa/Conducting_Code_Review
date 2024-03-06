import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewComponent } from '../features/administrator/user-view/user-view.component';
import { UserListingComponent } from '../features/administrator/user-listing/user-listing.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path:'admin',
    canActivate: [authGuard],
    component: UserListingComponent
    
  },
  {
    path:'admin/view',
    canActivate: [authGuard],
    component: UserViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
