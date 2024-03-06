import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  // standalone: true,
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.sass'],
})
export class InputFieldComponent {
  @Input() config: any;
  group!: FormGroup;
  // field: any;
  @Input() disabled: any;
  errorMessage: string = '';
  errorArray: Array<string> = [];
  constructor() { }

  onButtonClicked() {
  }
  ngOnInit() {
    this.updateErrorMessage()
  }

  updateErrorMessage() {
    let controlName  = this.config.name

    console.log('this.config', this.config);
    console.log('controlName', controlName);
    console.log('validators', this.group.controls[controlName]);
    
    this.errorArray = this.config.customErrorMessages.map((errorMessage: object) => errorMessage)

    if (controlName?.errors?.['required'] && controlName?.touched) {
        this.errorMessage = 'Field is required.';
    } else if (controlName?.errors?.['pattern'] && controlName?.touched) {
        this.errorMessage = 'Invalid pattern.';
    } else {
        this.errorMessage = ''; 
    }
}
}