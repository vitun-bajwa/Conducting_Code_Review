import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { changePasswordForm } from 'src/app/core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';
import { UiModule } from 'src/app/ui/ui.module';
import { DynamicFormModule } from '../../../shared/dynmic-form/dynamic-form.module';
import { errorMessage, succssMessage } from 'src/app/core/enums/common.enum';

@Component({
  selector: 'app-change-password',
  standalone: true,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass'],
  imports: [UiModule, DynamicFormModule]
})
export class ChangePasswordComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = changePasswordForm;
  user: any = [];
  constructor(
    private apiService: CommonService,
    private router: Router,
  ) { }

  changePassword() { 
    this.trimFormValues();
    let user  = JSON.parse(sessionStorage.getItem('user') || '');
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else if(atob(user.password) === this.form.form.value.oldPassword) {
      let data: any = {
        ...user,
        password: btoa(this.form.form.value.password),
      }
      this.apiService.edit('users/' + user.id, data).subscribe((data: any) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        this.apiService.successMSG(succssMessage.changePassword);
        this.router.navigateByUrl('/admin');
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
      if (typeof control?.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
  }
}