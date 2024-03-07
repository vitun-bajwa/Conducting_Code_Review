import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeReviewRoutingModule } from './code-review-routing.module';
import { CodeReviewListingComponent } from './components/code-review-listing/code-review-listing.component';
import { AddCodeReviewComponent } from './components/add-code-review/add-code-review.component';


@NgModule({
  declarations: [
    CodeReviewListingComponent,
    AddCodeReviewComponent
  ],
  imports: [
    CommonModule,
    CodeReviewRoutingModule
  ]
})
export class CodeReviewModule { }
