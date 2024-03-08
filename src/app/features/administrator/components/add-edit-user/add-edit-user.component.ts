import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { signUpForm } from 'src/app/core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.sass']
})
export class AddEditUserComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = signUpForm
 
  constructor(private apiService: CommonService, private snackBar: MatSnackBar, private router: Router){}

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
