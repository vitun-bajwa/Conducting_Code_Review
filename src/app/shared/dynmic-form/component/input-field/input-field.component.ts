import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.sass'],
})
export class InputFieldComponent {
  @Input() config: any;
  group!: FormGroup;
  field: any;

  @Input() disabled: any;

  constructor() {}

  onButtonClicked() {
  }

}
