import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tableEnum } from 'src/app/core/enums/common.enum';
import { FieldConfig } from 'src/app/core/models/field-config';
import { UiModule } from 'src/app/ui/ui.module';

@Component({
  selector: 'app-button-field',
  standalone: true,
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.sass'],
  imports: [ CommonModule, UiModule]
})
export class ButtonFieldComponent {
  @Input() config!: FieldConfig;
  group!: FormGroup;
  @Output() btnClickEvent = new EventEmitter<string>();
  statusVal: boolean = false;
  toggleBtn: typeof tableEnum = tableEnum;

  constructor() {}

  ngAfterViewInit() {
    if (this.config?.fieldType == tableEnum.toggle) {
      this.statusVal = this.config.name == tableEnum.Active ? true : false;
    }
  }

  onButtonClicked() {
    if(this.config.fieldType == tableEnum.toggle) this.statusVal != this.statusVal
    this.btnClickEvent.emit('Click');
  }
  
}
