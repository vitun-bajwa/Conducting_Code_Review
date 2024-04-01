import { Component, ViewChild } from '@angular/core';
import { FieldConfig } from 'src/app/core/models/field-config';
import { forgotForm, resetPasswordForm } from '../../../core/config/form.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiEndPoints, commonEnum, errorMessage, routes, succssMessage } from 'src/app/core/enums/common.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent {
  @ViewChild('form') form: any;
  @ViewChild('ngOtpInput') ngOtpInput: any;
  title: string = commonEnum.title;
  config: FieldConfig[] = forgotForm
  subscription = new Subscription();
  errorConfig: FieldConfig = {
    name: 'forgot-password',
    fieldType: 'otp',
    hidden: true,
  }
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
  }
  SubmitBtn: FieldConfig = {
    class: 'button',
    name: 'Submit',
  }
  filledDigits: number = 0;
  submit: boolean = false;

  constructor(
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {}

  forgotPassword(e: any) {
    this.form.form.markAllAsTouched();
    let email = e.email
    this.subscription.add(this.commonService.get(apiEndPoints.users).subscribe(
      (data: any) => {
        this.loader = true;
        this.logindata = data;
        this.matchdata = this.logindata.find((data: any) => data.email === email);

        // Check if user's status is active
        if (this.matchdata && this.matchdata.status === 'active') {
          this.commonService.successMSG(succssMessage.emailVerified);

          // Proceed with password change
          setTimeout(() => {
            this.loader = false;
            this.showloginpage = false;
            this.validOtp = Math.floor(Math.random() * 1000000);
            this.configs.length = this.validOtp.toString().length;
          }, 1500);
        } else {
          // Display message if user's status is inactive
          if (this.matchdata && this.matchdata.status !== 'active') {
            this.commonService.errorMSG(errorMessage.statusInctive, 4000);
          }else if (email) {
            this.commonService.errorMSG(errorMessage.invalidEmail, 4000);
          }
          this.loader = false;
        }
        // this.form.form.reset();
    }));
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    if (this.validOtp.toString()?.length != this.otp?.length && this.submit){
      this.errorConfig.hidden = false;
    }else {
      this.errorConfig.hidden = true;
    }
  }

  otpVerfication() {
    this.submit = true;
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.validOtp == this.otp) {
      this.verifiedReset = true;
    } else if (this.validOtp.toString()?.length != this.otp?.length){
      this.errorConfig.hidden = false;
    }else {
      this.commonService.errorMSG(errorMessage.wrongOtp);
    }
  }
  onInput(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    event.target.value = inputValue;
  }

  onOTPDigitChange() {
    this.filledDigits = this.otp?.filter((digit: any) => digit).length;
  }

  isOTPFilledAndCorrect(): boolean {
    return this.filledDigits === this.configs.length && this.validOtp === this.otp.join('');
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
      this.subscription.add(this.commonService.edit(apiEndPoints.user + this.matchdata.id, data).subscribe((data: any) => {
        this.router.navigateByUrl(routes.empty);
        this.commonService.successMSG(succssMessage.passwordUpdated);
      }));
      this.form.form.reset()
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
