import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynmic-form/dynamic-form.module';

const material:any = []
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DynamicFormModule,
    material
  ],
  exports: [
    material,
    DynamicFormModule
  ]
})
export class SharedModule { }
