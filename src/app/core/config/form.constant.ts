import { Validators } from "@angular/forms";
import { reg } from "../regex/reg";
import { passwordvalidaator } from "../regex/passwordvalidaator";

export const loginForm = [
    {
      type: 'input',
      fieldType: 'email',
      name: 'email',
      value: '',
      placeholder: 'Email',
      validation: [Validators.required, Validators.pattern(reg.email)],
      isRequired: true,
      class: 'input',
      error: false,
    },
    {
      type: 'input',
      fieldType: 'password',
      name: 'password',
      value: '',
      placeholder: 'Password',
      validation: [Validators.required, Validators.pattern(reg.password)],
      isRequired: true,
      class: 'input',
      error: false
    },
    {
      type: 'button',
      name: 'Login',
      class: 'button',
    },
  ];

  export const signUpForm:any = [
    {
      type: 'input',
      fieldType: 'text',
      name: 'firstName',
      value: '',
      placeholder: 'First Name',
      validation: [Validators.required, Validators.pattern(reg.name)],
      isRequired: true,
      class: 'input',
      error: false,
    },
    {
      type: 'input',
      fieldType: 'text',
      name: 'lastName',
      value: '',
      placeholder: 'Last Name',
      validation: [Validators.required, Validators.pattern(reg.name)],
      isRequired: true,
      class: 'input',
      error: false,
    },
    {
      type: 'input',
      fieldType: 'email',
      name: 'email',
      value: '',
      placeholder: 'Email',
      validation: [Validators.required, Validators.pattern(reg.email)],
      isRequired: true,
      class: 'input',
      error: false,
    },
    {
      type: 'input',
      fieldType: 'password',
      name: 'password',
      value: '',
      placeholder: 'Password',
      validation: [Validators.required, Validators.pattern(reg.password)],
      isRequired: true,
      class: 'input',
      error: false
    },
    {
      type: 'select',
      fieldType: 'text',
      name: 'userRole',
      value: '',
      placeholder: 'Select Role',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',
      error: false,
      options: [
        {id: '1', name:'candidate'},
        {id:'2', name: 'admin'}
      ]
    },
    {
      type: 'button',
      name: 'Sign Up',
      class: 'button',
    },
  ];

  export const forgotForm:any = [
    {
      type: 'input',
      fieldType: 'email',
      name: 'email',
      value: '',
      placeholder: 'Email',
      validation: [Validators.required, Validators.pattern(reg.email)],
      isRequired: true,
      class: 'input',
      error: false,
    },
    {
      type: 'button',
      name: 'Forgot Password',
      class: 'button',
    },
  ]

  
  export const resetPasswordForm:any = [
    {
      type: 'input',
      fieldType: 'password',
      name: 'password',
      value: '',
      placeholder: 'Password',
      validation: [Validators.required, Validators.pattern(reg.password)],
      isRequired: true,
      class: 'input',
      error: false
    },
    {
      type: 'input',
      fieldType: 'password',
      name: 'confirmPassword',
      value: '',
      placeholder: 'Confirm Password',
      validation: [Validators.required, Validators.pattern(reg.password), passwordvalidaator()],
      isRequired: true,
      class: 'input',
      error: false
    },
    {
      type: 'button',
      name: 'Save',
      class: 'button',
    },
  ]