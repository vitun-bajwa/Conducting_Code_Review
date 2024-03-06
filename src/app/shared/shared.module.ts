import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynmic-form/dynamic-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DynamicFormModule,
    UiModule
  ],
  exports: [
    DynamicFormModule,
    UiModule
  ]
})
export class SharedModule { }
