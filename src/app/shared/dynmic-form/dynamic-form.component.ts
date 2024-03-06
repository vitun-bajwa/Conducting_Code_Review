import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() submitted = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(this.config);
  }

  ngOnInit() {
    this.form = this.createGroup();
  }

  createGroup() {
    const group = this.fb.group({});
    this.config.forEach(control => group.addControl(control.name, this.fb.control(control.value)));
    return group;
  }
  
  handleSubmit(e:any) {
    
  }


}
