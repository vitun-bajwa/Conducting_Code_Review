import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

const material:any = [MatFormFieldModule,MatInputModule,MatSelectModule]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiRoutingModule,
    material,
  ],
   exports: [
    material,
   ]
})
export class UiModule { }
