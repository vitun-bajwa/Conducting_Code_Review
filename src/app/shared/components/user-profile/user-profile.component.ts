import { Component, ViewChild } from '@angular/core';
import { profileForm } from 'src/app/core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { UiModule } from 'src/app/ui/ui.module';
import { DynamicFormModule } from '../../dynmic-form/dynamic-form.module';
import { CommonService } from 'src/app/core/service/common.service';
import { Router } from '@angular/router';
import { currentUser } from 'src/app/core/models/common-config';
import { apiEndPoints, commonEnum, getItem, routes, setItem, succssMessage, warningMessage } from 'src/app/core/enums/common.enum';
import { ButtonFieldComponent } from "../../dynmic-form/component/button-field/button-field.component";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.sass'],
    imports: [UiModule, DynamicFormModule, ButtonFieldComponent]
})
export class UserProfileComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = profileForm;
  currentUser!: currentUser;
  subscription = new Subscription();
  userData: any;
  formHeading: string = commonEnum.profile;
  routeTo!: string;
  backBtn = {
    class: 'button',
    name: 'Back',
  }
  
  constructor(private commonService: CommonService, private router: Router,) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
    this.routeTo = (this.currentUser.userRole == commonEnum.Admin || this.currentUser.userRole == commonEnum.superAdmin) ? routes.user : routes.codeReview;
  }

  ngAfterViewInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.subscription.add(this.commonService.get(apiEndPoints.users, '').subscribe((res: any) => {
      this.userData = res;
      this.userData = this.userData.find((x: any) => x.id == this.currentUser.id);
      this.form.form.patchValue({
        firstName: this.userData?.firstName,
        email: this.userData?.email,
        lastName: this.userData?.lastName,
      })
    }));
  }

  updateUserInfo() {
    this.subscription.add(this.commonService.get(apiEndPoints.user + this.currentUser.id).subscribe((res: any) => {
      let userData = {...this.userData}
      let data = {...this.userData}
      data.firstName = this.form.form.value.firstName,
      data.lastName = this.form.form.value.lastName,
      data.email = this.form.form.value.email ? this.form.form.value.email : this.userData.email
      if (JSON.stringify(data) !== JSON.stringify(userData)) {
        this.subscription.add(this.commonService.edit(apiEndPoints.user + this.currentUser.id, data).subscribe((updateRes: any) => {
          this.commonService.successMSG(succssMessage.detailsUpdated);
          sessionStorage.setItem(setItem.user, JSON.stringify(updateRes));
          this.router.navigateByUrl(this.routeTo);
        }));
      }
      else{
        this.commonService.warningMSG(warningMessage.nothingToUpdated);
      }
    }));
  }

  back() {
    this.router.navigateByUrl(this.routeTo);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
