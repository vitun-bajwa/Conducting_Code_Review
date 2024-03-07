import { Component, ViewChild } from '@angular/core';
import { signUpForm } from '../../../core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';
import { DynamicFormComponent } from 'src/app/shared/dynmic-form/dynamic-form.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = signUpForm

  constructor(private apiService: CommonService) { }

  ngOnInit() {

  }
  
  signUpUser() {
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    }
    else {
      this.apiService.add('user',this.form.form.value).subscribe((res: any) => {})
    }
  }
}
