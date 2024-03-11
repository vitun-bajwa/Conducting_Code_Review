import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  userId: any;
 
  constructor(private apiService: CommonService, private snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute){
    this.activatedRoute.paramMap.subscribe((param: any) => {
      this.userId = param.params.id;
    });
  }
  
  ngOnInit(){
    if(this.userId) {
      this.config.splice(this.config.findIndex((x: any) => x.fieldType == 'password'), 1);
     let test =  this.config.find((x:any) => { x.type == 'button'})
    }

    this.apiService.get('users/', this.userId).subscribe((res: any) => {
      this.form.form.patchValue({
        firstName: res?.firstName,
        email: res?.email,
        lastName: res?.lastName,
        userRole: res?.userRole,
      })
    });
  
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

  updateUser(){
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      let data = {
        ...this.form.form.value,
      }
      this.apiService.edit('users/'+ this.userId,data).subscribe((res: any) => {
        this.snackBar.open('User updated successfully.','',{
          duration: 1000
        });
        this.router.navigateByUrl('admin');
      })
    }

  }

}
