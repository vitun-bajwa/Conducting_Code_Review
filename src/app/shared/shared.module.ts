import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynmic-form/dynamic-form.module';
import { UiModule } from '../ui/ui.module';
import { TableComponent } from './components/table/table.component';
import { ButtonFieldComponent } from './dynmic-form/component/button-field/button-field.component';
import { CommonFilterComponent } from './components/common-filter/common-filter.component';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';


@NgModule({
  declarations: [
    TableComponent,
    CommonFilterComponent,
    CommonDialogComponent
  ],
  imports: [
    CommonModule,
    DynamicFormModule,
    UiModule,
    ButtonFieldComponent,
  ],
  exports: [
    DynamicFormModule,
    UiModule,
    TableComponent,
    ButtonFieldComponent,
    CommonFilterComponent
  ]
})
export class SharedModule { }
