import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { codeReviewForm } from 'src/app/core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';
@Component({
  selector: 'app-add-code-review',
  templateUrl: './add-code-review.component.html',
  styleUrls: ['./add-code-review.component.sass']
})
export class AddCodeReviewComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = codeReviewForm
 
  constructor(private apiService: CommonService, private snackBar: MatSnackBar, private router: Router){}
  addBtn = {
    class: 'button',
    name: 'Back',
  }
  addUser(){
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      let data = {
        ...this.form.form.value,
        status: 'Active'
      }
      this.apiService.add('users', data).subscribe((res: any) => {
        this.snackBar.open('User added successfully.','',{
          duration: 1000
        });
        this.router.navigateByUrl('admin');
      })
    }
  }

}
