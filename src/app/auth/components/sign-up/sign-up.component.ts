import { Component, ViewChild } from '@angular/core';
import { signUpForm } from '../../../core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = signUpForm

  constructor(private apiService: CommonService, private router: Router) { }

  ngOnInit() { }

  signUpUser() {
    this.trimFormValues();
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    } else {
      const email = this.form.form.get('email').value;
      this.apiService.get('users').subscribe(
          (response: any) => {
            const existingUser = response.find((user: any) => user.email === email);
            if (existingUser) {
              this.apiService.errorMSG('This email is already registered. Please use a different email address.');
              this.form.form.reset();
            } else {
              const data = {
                ...this.form.form.value,
                status: 'Pending',
                password: btoa(this.form.form.value.password)
              };
              delete data.SignUp;
              delete data.AddUser;
              this.apiService.add('users', data).subscribe((res: any) => {
                this.router.navigateByUrl('/auth/login');
                this.apiService.successMSG('Sign-up successful');
              });
              this.form.form.reset();
            }
          });
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
