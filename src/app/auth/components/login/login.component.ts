import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/core/models/field-config';
import { loginForm } from '../../../core/config/form.constant';
import { CommonService } from 'src/app/core/common.service';
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


  constructor(private apiService: CommonService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    const payload = {
      email: this.form.form.value.email,
      password: this.form.form.value.password
    }
    if (this.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      this.apiService.get('user').subscribe((res: any) => {
        this.user = res.find((x: any) => x.email === this.form.form.value.email && x.password === this.form.form.value.password);
        if (this.user) {
          let token = Math.random().toString(36).slice(2);
          sessionStorage.setItem('token', token);
          if (token) {
            let url = this.user.role ? '/admin' : '/candidate';
            this.router.navigateByUrl(url);
          }
        }
      })
    }
  }


}
