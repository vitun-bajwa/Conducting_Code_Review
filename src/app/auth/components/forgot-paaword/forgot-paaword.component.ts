import { Component, ViewChild } from '@angular/core';
import { FieldConfig } from 'src/app/core/models/field-config';
import { loginForm } from '../../../core/config/form.constant';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-forgot-paaword',
  templateUrl: './forgot-paaword.component.html',
  styleUrls: ['./forgot-paaword.component.sass']
})
export class ForgotPaawordComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = loginForm

  constructor(private apiService: CommonService) { }

  ngOnInit() {

  }

  submit(e:any){

  }

}
