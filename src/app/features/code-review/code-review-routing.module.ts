import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeReviewListingComponent } from './components/code-review-listing/code-review-listing.component';
import { AddCodeReviewComponent } from './components/add-code-review/add-code-review.component';

const routes: Routes = [
  {
    path:'',
    component: CodeReviewListingComponent
    
  },
  {
    path:'add',
    component: AddCodeReviewComponent
  },
  {
    path:'edit/:id',
    component: AddCodeReviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeReviewRoutingModule { }
