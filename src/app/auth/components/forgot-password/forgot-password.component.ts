import { Component, ViewChild } from '@angular/core';
import { FieldConfig } from 'src/app/core/models/field-config';
import { forgotForm, resetPasswordForm } from '../../../core/config/form.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiEndPoints, succssMessage } from 'src/app/core/enums/common.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = forgotForm
  resetPasswordForm: FieldConfig[] = resetPasswordForm
  verifiedReset: boolean = false;
  loader: boolean = false;
  logindata: any = [] = []
  showloginpage: Boolean = true
  matchdata: any
  timer: any;
  validOtp!: number;
  otp: any;
  hidepage: boolean = false;
  configs = {
    allowNumbersOnly: false,
    length: 0,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  }

  constructor(
    private apiService: CommonService, 
    private router: Router, 
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  forgotPassword(e: any) {
    this.form.form.markAllAsTouched();
    let alluseremail: any = {
      email: e.email,
    }
    this.apiService.get(apiEndPoints.users).subscribe(
      (data: any) => {
        this.loader = true;
        this.logindata = data;
        this.matchdata = this.logindata.find((data: any) => data.email === alluseremail.email);
        this.snackBar.open(this.matchdata ? succssMessage.emailVerified : succssMessage.enterValidEmail,'',{
          duration: 1800
        });
        if (this.matchdata) {
          setTimeout(() => {
            this.loader = false;
            this.showloginpage = false
            this.validOtp = Math.floor(Math.random() * 1000000);
            this.configs.length = this.validOtp.toString().length
          }, 1500);
        } else {
          this.loader = false;
        }
      this.form.form.reset();
    });
  }

  otpVerfication() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.validOtp == this.otp) {
      this.verifiedReset = true;
    }
    else {
      this.timer = setTimeout(() => {
      }, 1000);
    }
  }
  onOtpChange(otp: any) {
    this.otp = otp;
  }

  resetPassword() {
    this.trimFormValues();
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched()
    }
    else {
      let data: any = {
        ...this.matchdata,
        password: btoa(this.form.form.value.password),
      }
      this.apiService.edit(apiEndPoints.users + this.matchdata.id, data).subscribe((data: any) => {
        this.router.navigateByUrl('/');
        this.apiService.successMSG(succssMessage.passwordUpdated);
      }
      );
      this.form.form.reset()
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
