import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormDirective } from '../../core/directive/dynamic-form.directive';
import { InputFieldComponent } from './component/input-field/input-field.component';
import { ButtonFieldComponent } from './component/button-field/button-field.component';
import { UiModule } from 'src/app/ui/ui.module';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { ErrorsComponent } from './component/errors/errors.component';
import { DatePickerComponent } from './component/date-picker/date-picker.component';
import { TextareaComponent } from './component/textarea/textarea.component'


@NgModule({
    declarations: [DynamicFormComponent, DynamicFormDirective, InputFieldComponent, DropdownComponent, DatePickerComponent, TextareaComponent],
    exports: [DynamicFormComponent, InputFieldComponent],
    imports: [
        CommonModule,
        DynamicFormRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        UiModule,
        ErrorsComponent
    ]
})
export class DynamicFormModule { }
