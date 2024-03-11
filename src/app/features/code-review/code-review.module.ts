import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeReviewRoutingModule } from './code-review-routing.module';
import { CodeReviewListingComponent } from './components/code-review-listing/code-review-listing.component';
import { AddCodeReviewComponent } from './components/add-code-review/add-code-review.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UiModule } from 'src/app/ui/ui.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CodeReviewListingComponent,
    AddCodeReviewComponent,
  ],
  imports: [
    CommonModule,
    CodeReviewRoutingModule,
    CKEditorModule,
    UiModule,
    SharedModule
  ]
})
export class CodeReviewModule { }
