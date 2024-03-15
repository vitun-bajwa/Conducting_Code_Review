import { Component, ViewChild } from '@angular/core';
import { FieldConfig } from 'src/app/core/models/field-config';
import { loginForm } from '../../../core/config/form.constant';
import { CommonService } from 'src/app/core/service/common.service';
import { Router } from '@angular/router';
import { errorMessage, succssMessage, tableEnum } from 'src/app/core/enums/common.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  @ViewChild('form') form: any;
  config: FieldConfig[] = loginForm
  user: any = [];
  loginButton: object = {
    type: 'button',
    name: 'Login',
    class: 'button',
  }

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
   }

  login() {
    this.trimFormValues();
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
      return; 
    }
    this.commonService.get('users').subscribe((res: any) => {
      const user = res.find((x: any) => x.email === this.form.form.value.email && atob(x.password) === this.form.form.value.password);
      if (!user) {
        this.commonService.errorMSG(errorMessage.Invalid);
        return; 
      }
      if (user.status !== tableEnum.Active) {
        this.commonService.errorMSG(errorMessage.inActive);
        return;
      }
      let token = Math.random().toString(36).slice(2);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      let url = (user.userRole == tableEnum.Admin || user.userRole == tableEnum.superAdmin) ? '/admin' : '/codeReview';
      this.router.navigateByUrl(url);
      this.commonService.successMSG(succssMessage.login);
      this.form.form.reset();
    });
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
