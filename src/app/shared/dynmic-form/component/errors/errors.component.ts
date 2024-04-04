import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { validation } from 'src/app/core/enums/common.enum';
import { FieldConfig } from 'src/app/core/models/field-config';

@Component({
  selector: 'app-errors',
  standalone: true,
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.sass'],
  imports: [MatFormFieldModule, ReactiveFormsModule, FormsModule, CommonModule]
})
export class ErrorsComponent {

  @Input() errors!: FieldConfig
  @Input() group!: FormGroup;
  enum: typeof validation = validation

  constructor() {}
  
  ngOnInit() {}
  
  ngAfterViewInit() {
  }


}
