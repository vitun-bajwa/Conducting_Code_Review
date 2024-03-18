import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { validation } from 'src/app/core/enums/common.enum';
import { FieldConfig } from 'src/app/core/models/field-config';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.sass']
})
export class ErrorsComponent {

  @Input() errors!: FieldConfig
  @Input() group!: FormGroup;
  enum: typeof validation = validation

  constructor() {}
  
  ngOnInit() {}
  
  ngAfterViewInit() {
    this.errors
  }


}
