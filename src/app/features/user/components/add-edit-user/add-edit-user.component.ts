import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { signUpForm } from 'src/app/core/config/form.constant';
import { commonEnum } from 'src/app/core/enums/common.enum';
import { currentUser } from 'src/app/core/models/common-config';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.sass']
})
export class AddEditUserComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = signUpForm;
  userId!: string;
  currentUser!: currentUser;
  addBtn = {
    class: 'button',
    name: 'Back',
  }
  formHeading!: string;
  buttonLabel: string = 'Add User';
  constructor(private apiService: CommonService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((param: any) => {
      this.userId = param.params.id;
    });
    if (this.userId) {
      this.config.filter(item => {
        if (item.fieldType === 'email') {
          item.disabled = true;
        }
        return item
      })
    }
    this.formHeading = this.userId ? commonEnum.editUser : commonEnum.addUser;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('user')!);
    // this.currentUser = JSON.parse(this.currentUser)
    if (this.userId) {
      let index = this.config.findIndex((x: any) => x.fieldType == 'password')
      if (index != -1) this.config.splice(index, 1);

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

  addUser() {
    this.trimFormValues();
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    } else {
      const email = this.form.form.value.email;
      this.apiService.get('users').subscribe
        (
          (response: any) => {
            const existingUser = response.find((user: any) => user.email === email);
            if (existingUser) {
              this.apiService.errorMSG('This email is already registered. Please use a different email address.');
            } else {
              let data = {
                ...this.form.form.value,
                status: 'Active',
                createdBy: this.currentUser.id,
                password: btoa(this.form.form.value.password),
              }
              delete data.SignUp;
              this.apiService.add('users', data).subscribe((res: any) => {
                this.apiService.successMSG('User added successfully')
                this.router.navigateByUrl('admin');
              })
              this.form.form.reset();
            }
          });
    }
  }
  // mujhe yaha pe jab koi user add krna chahe toh waha button pe add user likha aaye or jab edit krna hai user toh waha update user aaye button me toh conditionally kaise handle kru

  updateUser() {
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      let data = {
        ...this.form.form.value,
        status: this.currentUser.status,
        createdBy: this.currentUser.id,
      }
      this.apiService.edit('users/' + this.userId, data).subscribe((res: any) => {
        this.apiService.successMSG('User updated successfully')
        this.router.navigateByUrl('admin');
      })
    }
  }

  trimFormValues() {
    Object.keys(this.form.form.controls).forEach(controlName => {
      const control = this.form.form.get(controlName);
      if (typeof control?.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
  }
}
