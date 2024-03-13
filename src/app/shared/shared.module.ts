import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynmic-form/dynamic-form.module';
import { UiModule } from '../ui/ui.module';
import { TableComponent } from './components/table/table.component';
import { ButtonFieldComponent } from './dynmic-form/component/button-field/button-field.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EditorComponent } from './dynmic-form/component/editor/editor.component';


@NgModule({
  declarations: [
    TableComponent,
    ConfirmDialogComponent,
    EditorComponent
    
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
    EditorComponent
  ]
})
export class SharedModule { }
