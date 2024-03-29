import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserProfileComponent } from '../shared/components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user',
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
