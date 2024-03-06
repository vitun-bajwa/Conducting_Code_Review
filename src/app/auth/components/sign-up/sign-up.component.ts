import { Component, ViewChild } from '@angular/core';
import { signUpForm } from '../../config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/common.service';
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
  Submit(e: any) {
    debugger
    if (this.form.form.invalid) {
      this.form.markAllAsTouched();
    }
    else {
      console.log(this.form.form.value);
      this.apiService.senduserdata(this.form.form.value).subscribe((Element: any) =>
        console.log(Element)
      )
      // this.form.reset()
    }
  }
}
