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

  constructor(private apiService: CommonService, private snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute) {
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

    this.apiService.get('codeReview/', this.userId).subscribe((res: any) => {
      debugger
      res
      this.form.form.patchValue({
        moduleName: res?.moduleName,
        startDate: res?.email,
        endDate: res?.lastName,
        textEditor: res?.textEditor,
        codeReview: res?.codeReview,
      })
    });
  }

  addCodeReview() {
    this.form.form
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      let data = {
        ...this.form.form.value,
        userId: this.currentUser.id,
      }
      this.apiService.add('codeReview', data).subscribe((res: any) => {
        this.snackBar.open('Code Review sent successfully.', '', {
          duration: 1000
        });
        this.router.navigateByUrl('codeReview');
      })
    }
  }

  updateCodeReview() {
    
  }
}
