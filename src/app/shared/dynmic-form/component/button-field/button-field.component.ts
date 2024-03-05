import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-button-field',
  // standalone: true,
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.sass'],
})
export class ButtonFieldComponent {
  @Input() config: any;
  group!: FormGroup;
  @Output() btnClickEvent = new EventEmitter<string>();

  constructor() {}

  onButtonClicked() {
    debugger
    this.btnClickEvent.emit('Click');
  }
  
}
