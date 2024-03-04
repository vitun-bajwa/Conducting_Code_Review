import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from './models/field-config';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.sass'],
  exportAs: 'dynamicForm',
})
export class DynamicFormComponent {

  @Input()
  config: FieldConfig[] = [];
  
  form: FormGroup;
  field: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(this.config);
  }

  ngOnInit() {
    // this.form = this.createGroup();
  }

  handleSubmit(e:any) {

  }


}
