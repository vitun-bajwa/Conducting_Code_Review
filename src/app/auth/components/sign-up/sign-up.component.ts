import { Component, ViewChild } from '@angular/core';
import { signUpForm } from '../../../core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = signUpForm

  constructor(private apiService: CommonService, private snackBar: MatSnackBar) { }

  ngOnInit() {}
  
  signUpUser() {
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      let data = {
        ...this.form.form.value,
        status: 'Inactive'
      }
      delete data.SignUp
      this.apiService.add('users', data).subscribe((res: any) => {
        this.snackBar.open('sign-up successfully','',{
          duration: 1000, panelClass: ['snackbar-success']
        });
      })
    }
  }
}
