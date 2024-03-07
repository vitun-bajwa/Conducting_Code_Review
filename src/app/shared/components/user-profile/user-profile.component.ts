import { Component, ViewChild } from '@angular/core';
import { profileForm } from 'src/app/core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { UiModule } from 'src/app/ui/ui.module';
import { DynamicFormModule } from '../../dynmic-form/dynamic-form.module';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass'],
  imports: [UiModule, DynamicFormModule]
})
export class UserProfileComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = profileForm

  updateInfo(){

  }

}
