import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from './layout.component';
import { SignUpComponent } from '../auth/components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./../features/administrator/administrator.module').then((m) => m.AdministratorModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
