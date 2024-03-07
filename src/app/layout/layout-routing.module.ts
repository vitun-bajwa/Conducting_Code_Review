import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../features/administrator/administrator.module').then((m) => m.AdministratorModule),
      },
      {
        path: 'codereview',
        loadChildren: () => import('../features/code-review/code-review.module').then((m) => m.CodeReviewModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
