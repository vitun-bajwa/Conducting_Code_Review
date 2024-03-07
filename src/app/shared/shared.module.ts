import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynmic-form/dynamic-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    DynamicFormModule,
    UiModule,
  ],
  exports: [
    DynamicFormModule,
    UiModule,
    TableComponent
  ]
})
export class SharedModule { }
