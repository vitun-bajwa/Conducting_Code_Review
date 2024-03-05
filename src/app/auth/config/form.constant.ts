import { Validators } from "@angular/forms";
import { reg } from "../components/regex/reg";

export const loginForm = [
    {
      type: 'input',
      feildType: 'email',
      name: 'Email',
      value: '',
      placeholder: 'Email',
      validation: [Validators.required,Validators.pattern(reg.email)],
      isRequired: true,
      class: 'input',
      error: false,
    },
    {
      type: 'input',
      feildType: 'password',
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
