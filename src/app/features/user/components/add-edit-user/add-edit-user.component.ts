import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { adminList, userForm } from 'src/app/core/config/form.constant';
import { apiEndPoints, commonEnum, errorMessage, getItem, modalData, routes, succssMessage, tableEnum, warningMessage } from 'src/app/core/enums/common.enum';
import { addUser, currentUser } from 'src/app/core/models/common-config';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.sass']
})
export class AddEditUserComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = [...userForm];
  userId!: string;
  currentUser!: currentUser;
  userList!: Array<object>;
  subscription = new Subscription();
  activeAdmin!: Array<object>;
  userData!: currentUser;
  adminListConfig: FieldConfig[] = adminList;
  backBtn = {
    class: 'button',
    name: 'Back',
  }
  formHeading!: string;
  constructor(private apiService: CommonService, private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
    this.subscription.add(this.activatedRoute.paramMap.subscribe((param: any) => {
      this.userId = param.params.id;
    }));
    if (this.userId) {
    this.config[this.config.length - 1].name = commonEnum.update
    }else {
      this.config[this.config.length - 1].name = commonEnum.save
    }
    this.formHeading = this.userId ? commonEnum.editUser : commonEnum.addUser;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
    if (this.userId) {
      let passwordIndex = this.config.findIndex((x:any) => x.fieldType === tableEnum.password);
      let confirmPasswordIndex = this.config.findIndex((x:any) => x.fieldType === tableEnum.confirmPassword);
      if(confirmPasswordIndex != -1) {
        this.config.splice(confirmPasswordIndex, 1);
      }
      if(passwordIndex != -1) {
        this.config.splice(passwordIndex, 2);
      }
    }
    this.subscription.add(this.apiService.get(apiEndPoints.users).subscribe((res: any) => {
      this.userList = res
      this.activeAdmin = this.userList.filter((user: any) => {
        if (user.userRole === commonEnum.Admin && user.status === tableEnum.Active) {
          user['name'] = user.firstName + ' ' + user.lastName
          return user
        }
      });
    }));
    this.subscription.add(this.apiService.get(apiEndPoints.user, this.userId).subscribe((res: any) => {
      this.userData = res;
      this.form.form.patchValue({
        firstName: res?.firstName,
        email: res?.email,
        lastName: res?.lastName,
        userRole: res?.userRole,
        status: res?.status
      })
    }));
  }

  ngAfterViewInit() {
    this.onRoleChange();
  }
  
  onRoleChange() {
    this.subscription.add(this.form.form.controls[commonEnum.userRole].valueChanges.subscribe((res: string) => {
      if (this.currentUser.userRole == commonEnum.superAdmin && this.form.form.value[commonEnum.userRole] !== res) {
        this.config.find((item:FieldConfig) => {
          if (item.name == commonEnum.assignTo) {
            if (res == commonEnum.Candidate) {
              item.options = this.activeAdmin;
              item.hidden = false;
              item.isRequired = true;
              if (this.userData) this.form.form.controls[commonEnum.assignTo].setValue(this.userData.assignTo?.name)
              this.form.form.controls[commonEnum.assignTo].setValidators([Validators.required]);
            }else {
              item.hidden = true;
              item.isRequired = false;
              this.form.form.controls[commonEnum.assignTo].clearValidators();
            }
            this.form.form.controls[commonEnum.assignTo].updateValueAndValidity();
          }
        })
      }
    }));
  }

  userModify(type: string) {
    this.trimFormValues();
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    } else {
      this.updateData(type);
    }
  }

  updateData(type: string) {
    const existingUser = this.userList.find((user: any) => user.email === this.form.form.value.email);
    if (existingUser && this.userData.email != this.form.form.value.email) {
      this.apiService.errorMSG(errorMessage.alreadyEmailRegistered);
    } else {
      let assignTo;
      if (this.currentUser.userRole == commonEnum.superAdmin) {
        this.activeAdmin.find((item: any) => {
          if (item.name == this.form.form.value.assignTo) {
            assignTo = {id: item.id!, name: item.name!};
          }
        });
      }else {
        assignTo = {id:this.currentUser.id!, name: this.currentUser.name!}
      }
      let data: addUser = {
        firstName: this.form.form.value.firstName,
        lastName: this.form.form.value.lastName,
        email: this.form.form.value.email ? this.form.form.value.email : this.userData.email,
        password: btoa(this.form.form.value.password),
        userRole: this.form.form.value.userRole,
        status: this.form.form.value.status,
        assignTo: this.form.form.value.userRole == commonEnum.Candidate ? assignTo : null,
        createdBy: this.currentUser.id,
      }
      if (type == commonEnum.update) {
        let userData = {...this.userData}
        delete userData.id
        data.createdBy = this.userData.createdBy
        if (JSON.stringify(data) !== JSON.stringify(userData)) {
          this.subscription.add(this.apiService.edit(apiEndPoints.user + this.userId, data).subscribe((res: any) => {
            this.apiService.successMSG(succssMessage.Updated)
            this.router.navigateByUrl(routes.user);
          }));
        }else {
          this.apiService.warningMSG(warningMessage.nothingToUpdated)
        }
      } else {
        this.subscription.add(this.apiService.add(apiEndPoints.users, data).subscribe((res: any) => {
          this.apiService.successMSG(succssMessage.userAdded)
          this.router.navigateByUrl(routes.user);
        }));
      }
    }
  }

  trimFormValues() {
    Object.keys(this.form.form.controls).forEach(controlName => {
      const control = this.form.form.get(controlName);
      if (typeof control?.value === commonEnum.string) {
        control.setValue(control.value.trim());
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
