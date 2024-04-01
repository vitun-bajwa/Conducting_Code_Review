import { Validators } from "@angular/forms";
import { reg } from "../regex/reg";
import { passwordvalidaator } from "../regex/passwordvalidaator";

export const searchFeild = {
    type: 'input',
    fieldType: 'text',
    name: 'searchFilter',
    value: '',
    placeholder: 'Search',
    class: 'input',
  }

export const loginForm = [
    {
      type: 'input',
      fieldType: 'email',
      name: 'email',
      value: '',
      placeholder: 'Email',
      validation: [Validators.required],
      isRequired: true,
      hint: false,
      class: 'input',
      error: false,
    },
    {
      type: 'input',
      fieldType: 'password',
      name: 'password',
      value: '',
      placeholder: 'Password',
      validation: [Validators.required],
      isRequired: true,
      hint: false,
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
      hint: true,
      class: 'input',
      error: false,
    },
    {
      type: 'input',
      fieldType: 'password',
      name: 'password',
      value: '',
      placeholder: 'Password',
      validation: [Validators.required, Validators.pattern(reg.password), passwordvalidaator()],
      isRequired: true,
      hint: true,
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
      hint: true,
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
        {id: '1', name:'Candidate', value: 'Candidate'},
        {id:'2', name: 'Admin', value: 'Admin'}
      ]
    },
    {
      type: 'button',
      name: 'Sign Up',
      class: 'button',
    },
  ];

  export const userForm:any = [
    {
      label: 'First Name', 
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
      label: 'Last Name', 
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
      label: 'Email', 
      type: 'input',
      fieldType: 'email',
      name: 'email',
      value: '',
      placeholder: 'Email',
      validation: [Validators.required, Validators.pattern(reg.email)],
      isRequired: true,
      hint: true,
      class: 'input',
      error: false,
    },
    {
      label: 'Password', 
      type: 'input',
      fieldType: 'password',
      name: 'password',
      value: '',
      placeholder: 'Password',
      validation: [Validators.required, Validators.pattern(reg.password)],
      isRequired: true,
      hint: true,
      class: 'input',
      error: false
    },
    {
      label: 'Status', 
      type: 'select',
      fieldType: 'text',
      name: 'status',
      value: 'Active',
      placeholder: 'Status',
      isRequired: false,
      class: 'input',
      error: false,
      disabled: false,
      options: [
        {id: 'active', name: 'Active'},
        {id: 'inactive', name: 'Inactive'}
      ]
    },
    {
      label: 'Role', 
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
        {id: '1', name:'Candidate', value: 'Candidate'},
        {id:'2', name: 'Admin', value: 'Admin'}
      ]
    },
    {
      label: 'Assign To', 
      type: 'select',
      fieldType: 'text',
      name: 'assignTo',
      value: '',
      placeholder: 'Select Admin',
      isRequired: false,
      class: 'input',
      error: false,
      hidden: true,
      disabled: false,
      options: []
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
      hint: false,
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
      hint: true,
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
      hint: true,
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
      hint: false,
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
      hint: true,
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
      hint: true,
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
      hint: false,
      class: 'input',
      error: false,
    },
    {
      type: 'button',
      name: 'Save',
      class: 'button',
    },
  ];

  export const codeReviewRequestForm:any = [
    {
      label: "Title",
      type: 'input',
      fieldType: 'text',
      name: 'title',
      value: '',
      placeholder: 'Title',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',
      error: false,
      disabled: false
    },
    {
      label: "Module Start Date",
      type: 'daterange', 
      fieldType: 'date', 
      name: 'startDate', 
      value: '',
      placeholder: 'Start Date',
      validation: [Validators.required],
      isRequired: true,
      class: 'date',
      error: false,
      disabled: false
    },
    {
      label: "Module End Date",
      type: 'daterange', 
      fieldType: 'date',
      name: 'endDate',
      value: '',
      placeholder: 'End Date',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',
      error: false,
      disabled: false
    },
    {
      label: "Functional Description",
      type: 'textArea', 
      fieldType: 'codeDetails', 
      name: 'codeDescription', 
      value: '',
      placeholder: 'Code description..',
      validation: [Validators.required],
      isRequired: true,
      class: 'textArea',
      error: false,
      disabled: false
    },
    {
      label: "Add Code Snippets",
      type: 'textEditor', 
      fieldType: 'textEditor', 
      name: 'textEditor', 
      value: '',
      placeholder: '',
      validation: [Validators.required],
      isRequired: true,
      class: 'textEditor',
      error: false,
      disabled: false
    },
  ];
  
  export const codeReviewForm:any = [
    {
      label: "Review Comments",
      type: 'textArea', 
      fieldType: 'codeReview', 
      name: 'codeReview', 
      value: '',
      placeholder: 'Add your review here..',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',  
      error: false,
      disabled: false,
    },
  ];

  export const declineReason:any = [
    {
      type: 'textArea', 
      fieldType: 'codeReview', 
      name: 'codeReview', 
      value: '',
      placeholder: 'Decline reason',
      validation: [Validators.required],
      isRequired: true,
      class: 'input',  
      error: false,
      disabled: false,
    }
  ];
  export const adminList:any = [
  {
    type: 'select',
    fieldType: 'text',
    name: 'assignTo',
    value: '',
    placeholder: 'Select Admin',
    validation: [Validators.required],
    isRequired: true,
    class: 'input',
    error: false,
    disabled: false,
    options: [
    ]
  },
]