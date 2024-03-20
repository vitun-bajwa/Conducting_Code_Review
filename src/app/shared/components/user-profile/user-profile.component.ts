import { Component, ViewChild } from '@angular/core';
import { profileForm } from 'src/app/core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { UiModule } from 'src/app/ui/ui.module';
import { DynamicFormModule } from '../../dynmic-form/dynamic-form.module';
import { CommonService } from 'src/app/core/service/common.service';
import { Router } from '@angular/router';
import { currentUser } from 'src/app/core/models/common-config';
import { apiEndPoints, getItem, routes, setItem, succssMessage } from 'src/app/core/enums/common.enum';

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
  currentUser!: currentUser;
  userConfig: any;

  constructor(private commonService: CommonService, private router: Router,) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
  }

  ngAfterViewInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.commonService.get(apiEndPoints.users, '').subscribe((res: any) => {
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
    this.commonService.get(apiEndPoints.user+ this.currentUser.id).subscribe((res: any) => {
      const updatedUser = {
        ...res, 
        ...this.form.form.value,
      };
      this.commonService.edit(apiEndPoints.user+ this.currentUser.id, updatedUser).subscribe((updateRes:any) => {
        this.commonService.successMSG(succssMessage.detailsUpdated);
        sessionStorage.setItem(setItem.user, JSON.stringify(updateRes));
        this.router.navigateByUrl(routes.user);
      });
    });
  }
}
