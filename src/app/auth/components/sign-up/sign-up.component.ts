import { Component, ViewChild } from '@angular/core';
import { signUpForm } from '../../../core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';
import { Router } from '@angular/router';
import { apiEndPoints, commonEnum, errorMessage, routes, succssMessage } from 'src/app/core/enums/common.enum';
import { addUser, currentUser } from 'src/app/core/models/common-config';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = signUpForm
  currentUser!: currentUser;
  constructor(private apiService: CommonService, private router: Router) { }

  ngOnInit() { }

  signUpUser() {
    this.trimFormValues();
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    } else {
      const email = this.form.form.get('email').value;
      this.apiService.get(apiEndPoints.users).subscribe(
        (response: any) => {
          const existingUser = response.find((user: any) => user.email === email);
          if (existingUser) {
            this.apiService.errorMSG(errorMessage.alreadyRegistered);
          } else {
            const data : addUser = {
              firstName: this.form.form.value.firstName,
              lastName: this.form.form.value.lastName,
              email: this.form.form.value.email,
              password: btoa(this.form.form.value.password),
              userRole: this.form.form.value.userRole,
              status: 'Pending',
            };
            this.apiService.add(apiEndPoints.users, data).subscribe((res: any) => {
              this.router.navigateByUrl(routes.auth + routes.login);
              this.apiService.successMSG(succssMessage.signUp);
            });
            this.form.form.reset();
          }
        });
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
