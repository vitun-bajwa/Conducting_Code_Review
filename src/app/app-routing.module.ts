import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { unauthGuard } from './core/guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [unauthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ]
  },
  {
    path: 'layout',
    canActivate: [authGuard],
    children: [
      {
        path: 'layout',
        loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
