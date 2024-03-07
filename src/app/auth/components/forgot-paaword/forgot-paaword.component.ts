import { Component, ViewChild } from '@angular/core';
import { FieldConfig } from 'src/app/core/models/field-config';
import { forgotForm, resetPasswordForm } from '../../../core/config/form.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/common.service';

@Component({
  selector: 'app-forgot-paaword',
  templateUrl: './forgot-paaword.component.html',
  styleUrls: ['./forgot-paaword.component.sass']
})
export class ForgotPaawordComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = forgotForm
  resetPasswordForm: FieldConfig[] = resetPasswordForm
  
  logindata: any = [] = []
  showloginpage: Boolean = true
  matchdata: any
  timer: any;
  validOtp!: number;
  otp: any
  configs = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  }
  verifiedReset: boolean = false;
  constructor(private apiService: CommonService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  forgotPassword(e: any) {
    this.form.form.markAllAsTouched();
    let alluseremail: any = {
      email: e.email,
    }
    this.apiService.get('users').subscribe(
      (data: any) => {
        this.logindata = data;
        this.matchdata = this.logindata.find((data: any) => data.email === alluseremail.email);
        if (this.matchdata) {
          setTimeout(() => {
            this.validOtp = Math.floor(Math.random() * 1000000);
          }, 5000);
          this.showloginpage = false
          console.log(this.validOtp)
        }
        else {
          this.timer = setTimeout(() => {
          }, 1000)
      }
      this.form.form.reset();
  });
  }

  otpVerfication() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.validOtp == this.otp) {
      // this.notifyService.showSuccess("Otp Send Successful");
      // sessionStorage.setItem('token', this.matchdata.id);
      // sessionStorage.setItem('username', this.matchdata.email)
      // this.router.navigate(['/']);
      this.verifiedReset = true;
    }
    else {
      this.timer = setTimeout(() => {
        // this.notifyService.showError("Please enter a Valid otp")
      }, 1000);
    }
  }
  onOtpChange(otp: any) {
    this.otp = otp;
  }

  resetPassword() {
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched()
    }
    else {
      let id = this.route.snapshot.paramMap.get('id');
      let data: any = {
        id: id,
        password: this.form.form.value.password,
      }
      this.apiService.edit('users', data).subscribe((data: any) =>
        console.log(data)
      );
      this.form.form.reset()
      // this.message.showSuccess("Password Reset Succesfull")
    }
  }
}
