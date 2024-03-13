import { Component, ViewChild } from '@angular/core';
import { FieldConfig } from 'src/app/core/models/field-config';
import { loginForm } from '../../../core/config/form.constant';
import { CommonService } from 'src/app/core/service/common.service';
import { Router } from '@angular/router';


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
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      this.commonService.get('users').subscribe((res: any) => {
        this.user = res.find((x: any) => x.email === this.form.form.value.email && x.password === this.form.form.value.password && x.status == 'Active');
        if (this.user) {
          let token = Math.random().toString(36).slice(2);
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(this.user));
          if (token) {
            let url = (this.user.userRole == 'admin' || this.user.userRole == 'superAdmin') ? '/admin' : '/codeReview';
            this.router.navigateByUrl(url);
            this.commonService.successMSG('login successfully');
          }
        } else {
          this.commonService.errorMSG('Invalid email or password');
        }
        this.form.form.reset();
      });
    }
  }
}
