import { Component, ViewChild } from '@angular/core';
import { profileForm } from 'src/app/core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { UiModule } from 'src/app/ui/ui.module';
import { DynamicFormModule } from '../../dynmic-form/dynamic-form.module';
import { CommonService } from 'src/app/core/service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass'],
  imports: [UiModule, DynamicFormModule]
})
export class UserProfileComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = profileForm;
  currentUser: any;
  userConfig: any;

  constructor(private commonService: CommonService, private router: Router,) { }

  ngOnInit() {
    this.currentUser = sessionStorage.getItem('user');
    this.currentUser = JSON.parse(this.currentUser);
  }

  ngAfterViewInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.commonService.get('users', '').subscribe((res: any) => {
      this.userConfig = res;
      let user = this.userConfig.find((x:any) => x.id == this.currentUser.id);
      this.form.form.patchValue({
        firstName: user?.firstName,
        email: user?.email,
        lastName: user?.lastName,
      })
    });
  }

  updateUserInfo(){
    this.commonService.get('users/'+ this.currentUser.id).subscribe((res: any) => {
      const updatedUser = {
        ...res, 
        ...this.form.form.value, 
      };
      this.commonService.edit('users/'+ this.currentUser.id, updatedUser).subscribe((updateRes:any) => {
        this.commonService.successMSG('Details updated successfully');
        this.currentUser = sessionStorage.setItem('user', JSON.stringify(updateRes));
        this.router.navigateByUrl('admin');
      });
    });
  }
}
