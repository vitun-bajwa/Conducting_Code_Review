import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/core/models/field-config';
import { loginForm } from '../../config/form.constant';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  @ViewChild('form') form: any;
  config: FieldConfig[] = loginForm

  constructor(private apiService: CommonService) { }

  ngOnInit() {

  }
  Submit(e:any) {
    debugger
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    else {
      this.apiService.senduserdata(this.form.form.value).subscribe((Element: any) =>
        console.log(Element)
      )
      // this.form.reset()
    }
  }


}
