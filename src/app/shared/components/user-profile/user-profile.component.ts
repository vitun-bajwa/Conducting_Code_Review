import { Component, ViewChild } from '@angular/core';
import { profileForm } from 'src/app/core/config/form.constant';
import { FieldConfig } from 'src/app/core/models/field-config';
import { UiModule } from 'src/app/ui/ui.module';
import { DynamicFormModule } from '../../dynmic-form/dynamic-form.module';
import { CommonService } from 'src/app/core/service/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private commonService: CommonService, private snackBar: MatSnackBar) { }

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
      debugger
      this.form.form.patchValue({
        firstname: user?.firstname,
        email: user?.email,
        lastName: user?.lastName,
      })
    });
  }

  updateUserInfo(){
    let data = {
      ...this.form.form.value,
    }
    
    this.commonService.edit('users/'+ this.currentUser.id,data).subscribe((res:any) => {
      this.snackBar.open('Details updated successfully','',{
        duration: 1000
      });
    })
  }

}
