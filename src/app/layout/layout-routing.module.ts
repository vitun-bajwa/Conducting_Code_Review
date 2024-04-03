import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserProfileComponent } from '../shared/components/user-profile/user-profile.component';
import { userGuard } from '../core/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user',
        canActivate: [userGuard],
        loadChildren: () => import('./../features/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'codeReview',
        loadChildren: () => import('./../features/code-review/code-review.module').then((m) => m.CodeReviewModule),
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      }
    ]
  },
  {
    path: 'changePassword', component: ChangePasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
