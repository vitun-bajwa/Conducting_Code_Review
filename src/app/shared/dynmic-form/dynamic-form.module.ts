import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormDirective } from './directive/dynamic-form.directive';


@NgModule({
  declarations: [DynamicFormComponent, DynamicFormDirective],
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule { }
