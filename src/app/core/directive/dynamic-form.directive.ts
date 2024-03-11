import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, SimpleChanges, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../models/field';
import { ButtonFieldComponent } from '../../shared/dynmic-form/component/button-field/button-field.component';
import { InputFieldComponent } from '../../shared/dynmic-form/component/input-field/input-field.component';
import { DropdownComponent } from '../../shared/dynmic-form/component/dropdown/dropdown.component';
import { DatePickerComponent } from 'src/app/shared/dynmic-form/component/date-picker/date-picker.component';

const components: {[type: string]: Type<Field>} = {
  button: ButtonFieldComponent,
  input: InputFieldComponent,
  select: DropdownComponent,
  daterange: DatePickerComponent
  // textArea: FormTextareaComponent,
  // checkbox: FormCheckboxComponent,
  // password: FormPasswordComponent,
  // option: FormOptionsComponent,
};

@Directive({
  // selector: '[appDynamicForm]',
  // standalone: true
  selector: '[dynamicField]',
  exportAs: 'dynamicField'
})

export class DynamicFormDirective implements Field, OnChanges, OnInit {

  @Input() config: any;

  component!: ComponentRef<Field>;

  @Input() 
  group!: FormGroup;
  
  constructor(  
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
  ) {  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit(): void {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

}
