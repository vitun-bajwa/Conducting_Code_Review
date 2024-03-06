import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const material:any = [MatFormFieldModule,MatInputModule,MatSelectModule]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    material,
  ],
   exports: [
    FormsModule,
    ReactiveFormsModule,
    material,
   ]
})
export class UiModule { }
