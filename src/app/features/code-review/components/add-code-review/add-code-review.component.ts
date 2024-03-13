import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { codeReviewForm } from 'src/app/core/config/form.constant';
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
  @ViewChild(EditorComponent) editor: any;
  config: FieldConfig[] = codeReviewForm
  currentUser: any;
  userId: any;

  constructor(private apiService: CommonService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((param: any) => {
      this.userId = param.params.id;
    });
  }
  addBtn = {
    class: 'button',
    name: 'Back',
  }

  ngOnInit() {
    this.currentUser = sessionStorage.getItem('user');
    this.currentUser = JSON.parse(this.currentUser);
    if(this.userId){
      this.apiService.get('codeReview/', this.userId).subscribe((res: any) => {
        this.form.form.patchValue({
          moduleName: res?.moduleName,
          startDate: res?.startDate,
          endDate: res?.endDate,
          textEditor: res?.textEditor,
          codeReview: res?.codeReview,
        });
      });
    }
    
  }

  addCodeReview() {
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      let data = {
        ...this.form.form.value,
        userId: this.currentUser.id,
      }
      this.apiService.add('codeReview', data).subscribe((res: any) => {
        this.apiService.successMSG('Code Review sent successfully.')
        this.router.navigateByUrl('codeReview');
      })
    }
  }

  updateCodeReview() {
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      let data = {
        ...this.form.form.value,
      }
      this.apiService.edit('codeReview/' + this.userId, data).subscribe((res: any) => {
        this.apiService.successMSG('Code Review updated successfully.')
        this.router.navigateByUrl('codeReview');
      })
    }
  }
}
