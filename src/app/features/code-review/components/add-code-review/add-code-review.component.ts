import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { codeReviewForm, codeReviewRequestForm } from 'src/app/core/config/form.constant';
import { commonEnum, apiEndPoints, succssMessage, getItem } from 'src/app/core/enums/common.enum';
import { currentUser } from 'src/app/core/models/common-config';
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
  reviewForm!: FormGroup;
  @ViewChild(EditorComponent) editor: any;
  configRequest: FieldConfig[] = codeReviewRequestForm
  configReview: FieldConfig[] = codeReviewForm
  currentUser!: currentUser;
  userId: any;
  formHeading!: string;
  notView: boolean = false;
  codeReviewData: any;
  enum: typeof commonEnum = commonEnum;


  constructor(private apiService: CommonService, private router: Router,
    private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.activatedRoute.paramMap.subscribe((param: any) => {
      this.notView = this.router.url.includes('edit') || this.router.url.includes('add');
      this.userId = param.params.id;
    });


    this.formHeading = this.userId ? !this.notView ? commonEnum.viewCodeReview : commonEnum.editCodeReview : commonEnum.addCodeReview;
  }
  backBtn = {
    class: 'button',
    name: 'Back',
  }
  addBtn = {
    class: 'button',
    name: 'Save',
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
    if (this.userId) {
      this.apiService.get(apiEndPoints.codeReview, this.userId).subscribe((res: any) => {
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

  addCodeReview() {
    if(this.currentUser.userRole == commonEnum.Candidate) {
      if (this.form.form.invalid) {
        this.form.form.markAllAsTouched();
      } else {
        let data = {
          title: this.form.form.value.title,
          startDate: this.form.form.value.startDate,
          endDate: this.form.form.value.endDate,
          codeDescription: this.form.form.value.codeDescription,
          textEditor: this.form.form.value.textEditor,
          userId: this.currentUser.id,
          status: 'Pending'
        }
        this.apiService.add('codeReview', data).subscribe((res: any) => {
          this.apiService.successMSG(succssMessage.codeReview)
          this.router.navigateByUrl('codeReview');
        })
      }
    } else {
      if (this.form.form.invalid && this.review.form.invalid) {
        this.form.form.markAllAsTouched();
      } else {
        let data = {
          title: this.form.form.value.title,
          startDate: this.form.form.value.startDate,
          endDate: this.form.form.value.endDate,
          codeDescription: this.form.form.value.codeDescription,
          textEditor: this.form.form.value.textEditor,
          codeReview: this.review.form.value.codeReview,
          userId: this.currentUser.id,
          status: 'Pending'
        }
        this.apiService.add('codeReview', data).subscribe((res: any) => {
          this.apiService.successMSG(succssMessage.codeReview)
          this.router.navigateByUrl('codeReview');
        })
      }
    }
  }

  updateCodeReview() {
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      let data = {
        title: this.form.form.value.title,
        startDate: this.form.form.value.startDate,
        endDate: this.form.form.value.endDate,
        codeDescription: this.form.form.value.codeDescription,
        textEditor: this.form?.form.value.textEditor,
        codeReview: this.review?.form.value.codeReview,
        userId: this.currentUser.id,
        status: 'Reviewed'
      }
      this.apiService.edit(apiEndPoints.codeReview + this.userId, data).subscribe((res: any) => {
        this.apiService.successMSG(succssMessage.codeReviewUpdated)
        this.router.navigateByUrl('codeReview');
      })
    }
  }

  ngAfterViewInit(){
    if (!this.notView) {
      this.configRequest.map((item:any) => {
        item.disabled = true
      })
    
    }
  }
}
