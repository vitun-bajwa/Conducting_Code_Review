import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'src/app/core/models/field-config';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.sass']
})
export class ErrorsComponent {

  @Input() errors!: FieldConfig
  @Input() group!: FormGroup;

  constructor() {}
  
  ngOnInit() {}
  
  ngAfterViewInit() {
    this.errors
  }


}
