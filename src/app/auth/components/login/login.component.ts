import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/dynmic-form/models/field-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  @ViewChild('form') form: any;
  userName = {
    type: 'input',
    feildType: 'input',
    name: 'userName',
    value: '',
    placeholder: 'User Name',
    validation: [Validators.required],
    isRequired: true,
    class: 'input',
    error: false
  }
  config: FieldConfig[] = [
    {
      type: 'input',
      feildType: 'email',
      name: 'Email/Phone',
      value: '',
      placeholder: 'Email',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',
      error: false
    },
    {
      type: 'input',
      feildType: 'password',
      name: 'password',
      value: '',
      placeholder: 'Password',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',
      error: false
    },
    {
      type: 'button',
      name: 'Login',
      class: 'button',
      // disabled: true,
    },
  ];

  constructor() {}

  ngOnInit() {

  }


}
