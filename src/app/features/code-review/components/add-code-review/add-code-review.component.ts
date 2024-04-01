import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { codeReviewForm, codeReviewRequestForm } from 'src/app/core/config/form.constant';
import { commonEnum, apiEndPoints, succssMessage, getItem, routes, tableEnum, headingEnum, warningMessage } from 'src/app/core/enums/common.enum';
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
  subscription = new Subscription();
  configRequest: FieldConfig[] = codeReviewRequestForm
  configReview: FieldConfig[] = codeReviewForm
  currentUser!: currentUser;
  userId: any;
  formHeading!: string;
  notView: boolean = false;
  codeReviewData: any;
  enum: typeof headingEnum = headingEnum;
  backBtn: FieldConfig = {
    class: 'button',
    name: 'Back',
  }
  addBtn: FieldConfig = {
    class: 'button',
    name: 'Save',
  }

  approveBtn: FieldConfig = {
    class: 'button',
    name: 'Approve',
  }

  constructor(private commonService: CommonService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.subscription.add(this.activatedRoute.paramMap.subscribe((param: any) => {
      this.notView = this.router.url.includes('edit') || this.router.url.includes('add');
      this.userId = param.params.id;
    }));
    this.formHeading = this.userId ? !this.notView ? commonEnum.viewCodeReview : commonEnum.editCodeReview : commonEnum.addCodeReview;
    if (!this.notView) {
      this.configRequest.map((item:any) => {
        item.disabled = true
      });
      this.configReview.map((item:any) => {
        item.disabled = true
      });
    }
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
    if (this.userId) {
      this.subscription.add(this.commonService.get(apiEndPoints.codeReview, this.userId).subscribe((res: any) => {
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
      }));
    }
  }

  codeReview(type:string) {
    this.trimFormValues();
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
          data.status = tableEnum.Reviewed
          let codeReviewData = {...this.codeReviewData}
          delete codeReviewData.id
          if (JSON.stringify(data) !== JSON.stringify(codeReviewData)) {
            this.subscription.add(this.commonService.edit(apiEndPoints.codeReview + this.userId, data).subscribe((res: any) => {
              this.commonService.successMSG(succssMessage.codeReviewUpdated)
              this.router.navigateByUrl(routes.codeReview);
            }));
          }else {
            this.commonService.warningMSG(warningMessage.nothingToUpdated);
          }
        }
      }
      else {
        this.subscription.add(this.commonService.add(apiEndPoints.codeReviews, data).subscribe((res: any) => {
          this.commonService.successMSG(succssMessage.codeReview)
          this.router.navigateByUrl(routes.codeReview);
        }));
      }
    }
  }
  
  ngAfterViewInit() {}
  trimFormValues() {
    Object.keys(this.form.form.controls).forEach(controlName => {
      const control = this.form.form.get(controlName);
      if (typeof control?.value === commonEnum.string) {
        control.setValue(control.value.trim());
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}