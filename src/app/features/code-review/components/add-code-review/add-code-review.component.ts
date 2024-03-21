import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { codeReviewForm, codeReviewRequestForm } from 'src/app/core/config/form.constant';
import { commonEnum, apiEndPoints, succssMessage, getItem, routes, tableEnum } from 'src/app/core/enums/common.enum';
import { codeReview, currentUser } from 'src/app/core/models/common-config';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';
import { EditorComponent } from 'src/app/shared/dynmic-form/component/editor/editor.component';
@Component({
  selector: 'app-add-code-review',
  templateUrl: './add-code-review.component.html',
  styleUrls: ['./add-code-review.component.sass']
})
export class AddCodeReviewComponent {
  @ViewChild('form') form: any;
  @ViewChild('review') review: any;
  @ViewChild(EditorComponent) editor: any;
  configRequest: FieldConfig[] = codeReviewRequestForm
  configReview: FieldConfig[] = codeReviewForm
  currentUser!: currentUser;
  userId: any;
  formHeading!: string;
  notView: boolean = false;
  codeReviewData: any;
  enum: typeof commonEnum = commonEnum;
  backBtn: FieldConfig = {
    class: 'button',
    name: 'Back',
  }
  addBtn: FieldConfig = {
    class: 'button',
    name: 'Save',
  }

  constructor(private commonService: CommonService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((param: any) => {
      this.notView = this.router.url.includes('edit') || this.router.url.includes('add');
      this.userId = param.params.id;
    });
    this.formHeading = this.userId ? !this.notView ? commonEnum.viewCodeReview : commonEnum.editCodeReview : commonEnum.addCodeReview;
    if (!this.notView) {
      this.configRequest.map((item:any) => {
        item.disabled = true
      })
      this.configReview.map((item:any) => {
        item.disabled = true
      })
    }
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
    if (this.userId) {
      this.commonService.get(apiEndPoints.codeReview, this.userId).subscribe((res: any) => {
        this.codeReviewData = res
        this.form?.form.patchValue({
          title: res?.title,
          startDate: res?.startDate,
          endDate: res?.endDate,
          codeDescription: res?.codeDescription,
          textEditor: res?.textEditor,
        });
        this.review?.form.patchValue({
          codeReview: res?.codeReview,
        })
      });
    }
  }

  codeReview(type:string) {
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    } else {
      let data: codeReview = {
        title: this.form.form.value.title,
        startDate: this.form.form.value.startDate,
        endDate: this.form.form.value.endDate,
        codeDescription: this.form.form.value.codeDescription,
        textEditor: this.form.form.value.textEditor,
        userId: this.currentUser.id,
        assignTo: this.currentUser.assignTo,
        createdBy: this.currentUser.firstName +' '+ this.currentUser.lastName,
        reviewedBy: {},
        status: tableEnum.Pending,
      }
      if(this.currentUser.userRole != commonEnum.Candidate && this.review.form.value.codeReview) {
        data['codeReview'] = this.review.form.value.codeReview
      } else {
        data['codeReview'] = ''
      }
      if(type == commonEnum.update) {
        if (this.review.form.invalid) {
          this.review.form.markAllAsTouched();
        } else {
          data.userId = this.codeReviewData.userId,
          data.assignTo = this.codeReviewData.assignTo,
          data.createdBy = this.codeReviewData.createdBy,
          data.reviewedBy = { id: this.currentUser.id, name: this.currentUser.firstName +' '+ this.currentUser.lastName},
          data.status = tableEnum.Reviewed,
          this.commonService.edit(apiEndPoints.codeReview + this.userId, data).subscribe((res: any) => {
            this.commonService.successMSG(succssMessage.codeReviewUpdated)
            this.router.navigateByUrl(routes.codeReview);
          })
        }
      }else {
        this.commonService.add(apiEndPoints.codeReviews, data).subscribe((res: any) => {
          this.commonService.successMSG(succssMessage.codeReview)
          this.router.navigateByUrl(routes.codeReview);
        })
      }
    }
  }

  ngAfterViewInit() {}
}
