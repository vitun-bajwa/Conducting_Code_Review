import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { changePasswordForm } from 'src/app/core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';
import { apiEndPoints, commonEnum, errorMessage, getItem, routes, setItem, succssMessage } from 'src/app/core/enums/common.enum';
import { currentUser } from 'src/app/core/models/common-config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass'],
})
export class ChangePasswordComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = changePasswordForm;
  user: any = [];
  currentUser!: currentUser;
  commonEnum: typeof commonEnum = commonEnum;
  routes: typeof routes = routes;
  constructor(
    private apiService: CommonService,
    private router: Router,
  ) { 
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
  }

  changePassword() { 
    this.trimFormValues();
    let user  = JSON.parse(sessionStorage.getItem(getItem.user) || '');
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else if(atob(user.password) === this.form.form.value.oldPassword) {
      let data: any = {
        ...user,
        password: btoa(this.form.form.value.password),
      }
      this.apiService.edit(apiEndPoints.user + user.id, data).subscribe((data: any) => {
        sessionStorage.setItem(setItem.user, JSON.stringify(data));
        this.apiService.successMSG(succssMessage.changePassword);
        this.router.navigateByUrl(routes.users);
      });
    }
    else{
      this.apiService.errorMSG(errorMessage.oldPassword);
      this.form.form.reset();
    }
  }

  trimFormValues() {
    Object.keys(this.form.form.controls).forEach(controlName => {
      const control = this.form.form.get(controlName);
      if (typeof control?.value === commonEnum.string) {
        control.setValue(control.value.trim());
      }
    });
  }
}