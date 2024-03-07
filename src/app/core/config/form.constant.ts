import { Validators } from "@angular/forms";
import { reg } from "../regex/reg";
import { passwordvalidaator } from "../regex/passwordvalidaator";

const token = sessionStorage.getItem('token');

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
    // {
    //   type: 'button',
    //   name: 'Login',
    //   class: 'button',
    // },
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
      validation: '',
      isRequired: true,
      class: 'input',
      error: false,
      options: [
        {id: '1', name:'candidate', value: 'candidate'},
        {id:'2', name: 'admin', value: 'admin'}
      ]
    },
    {
      type: 'button',
      name: token ? 'Add User' : 'Sign-Up',
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

  export const profileForm :any = [
    {
      type: 'input',
      fieldType: 'firstname',
      name: 'firstname',
      value: '',
      placeholder: 'First Name',
      validation: [Validators.required, Validators.pattern(reg.name), Validators.minLength(9)],
      isRequired: true,
      class: 'input',
      error: false,
    },
    {
      type: 'input',
      fieldType: 'lastname',
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
      type: 'dropdown',
      fieldType: 'userRole',
      name: 'userRole',
      value: '',
      placeholder: 'Select Role',
      validation: '',
      isRequired: true,
      class: 'input',
      error: false,
      options: [
        {id: '1', name:'candidate', value: 'candidate'},
        {id:'2', name: 'admin', value: 'admin'}
      ]
    },
    {
      type: 'button',
      name: token ? 'Add User' : 'Sign-Up',
      class: 'button',
    },
  ];