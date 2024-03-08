import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const material:any = [MatFormFieldModule,MatInputModule,MatSelectModule, MatIconModule,MatProgressSpinnerModule,MatTabsModule,MatTableModule,MatIconModule,MatSnackBarModule]
@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    UiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    material,
  ],
   exports: [
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    material,
   ]
})
export class UiModule { }
