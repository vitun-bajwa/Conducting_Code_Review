import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/core/models/field-config';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.sass'],
})
export class InputFieldComponent {
  @Input() config!: FieldConfig;
  group!: FormGroup;
  @Input() disabled: any;
  errorMessage: string = '';
  errorArray: Array<string> = [];
  hide = false;
  constructor() { }

  ngOnInit() {}

  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  ngAfterViewInit() {
    if(this.config.disabled) this.group.controls[this.config.name].disable();
  }
  
}