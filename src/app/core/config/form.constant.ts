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
      validation: '',
      isRequired: true,
      class: 'input',
      error: false,
      options: [
        {id: '1', name:'Candidate', value: 'Candidate'},
        {id:'2', name: 'Admin', value: 'Admin'}
      ]
    },
    {
      type: 'button',
      name: token ? 'AddUser' : 'SignUp',
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
      placeholder: 'New Password',
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

  export const changePasswordForm:any = [
    {
      type: 'input',
      fieldType: 'password',
      name: 'oldPassword',
      value: '',
      placeholder: 'Old Password',
      validation: [Validators.required, Validators.pattern(reg.password)],
      isRequired: true,
      class: 'input',
      error: false
    },
    {
      type: 'input',
      fieldType: 'password',
      name: 'password',
      value: '',
      placeholder: 'New Password',
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
      name: 'Change Password',
      class: 'button',
    },
  ]
  export const profileForm :any = [
    {
      type: 'input',
      fieldType: 'text',
      name: 'firstName',
      value: '',
      placeholder: 'First Name',
      validation: [Validators.required, Validators.pattern(reg.name), Validators.minLength(9)],
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
      type: 'button',
      name: 'Update Profile',
      class: 'button',
    },
  ];

  export const codeReviewForm:any = [
    {
      type: 'input',
      fieldType: 'Module Name',
      name: 'moduleName',
      value: '',
      placeholder: 'Module Name',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',
      error: false,
      disabled: false
    },
    {
      type: 'daterange', 
      fieldType: 'date', 
      name: 'startDate', 
      value: '',
      placeholder: 'Start Date',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',  
      error: false,
    },
    {
      type: 'daterange', 
      fieldType: 'date',
      name: 'endDate',
      value: '',
      placeholder: 'End Date',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',
      error: false,
    },
    {
      type: 'textEditor', 
      fieldType: 'textEditor', 
      name: 'textEditor', 
      value: '',
      placeholder: '',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',  
      error: false,
    },
    {
      type: 'textArea', 
      fieldType: 'codeReview', 
      name: 'codeReview', 
      value: '',
      placeholder: 'Write code review',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',  
      error: false,
    },
    {
      type: 'button',
      name: 'Add Review Request',
      class: 'button',
    },
  ];
