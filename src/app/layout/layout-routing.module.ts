import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UserProfileComponent } from '../shared/components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./../features/administrator/administrator.module').then((m) => m.AdministratorModule),
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
