import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/auth/components/regex/error';

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

  constructor() { }

  onButtonClicked() {
  }
  ngOnInit() {
  }
}