import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.sass']
})
export class TextareaComponent {

  @Input() config: any;
  group!: FormGroup;

  ngAfterViewInit() {
    if(this.config.disabled) this.group.controls[this.config.name].disable();
  }

}
