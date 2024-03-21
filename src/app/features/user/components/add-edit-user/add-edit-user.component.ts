import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { adminList, signUpForm } from 'src/app/core/config/form.constant';
import { apiEndPoints, commonEnum, errorMessage, getItem, modalData, routes, succssMessage, tableEnum } from 'src/app/core/enums/common.enum';
import { addUser, currentUser } from 'src/app/core/models/common-config';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.sass']
})
export class AddEditUserComponent {
  @ViewChild('form') form: any;
  config: FieldConfig[] = signUpForm;
  configs: FieldConfig[] = adminList;
  userId!: string;
  currentUser!: currentUser;
  userList!: Array<object>;
  activeAdmin!: Array<object>;
  userData!: currentUser;
  adminListConfig: FieldConfig[] = adminList;
  addBtn = {
    class: 'button',
    name: 'Back',
  }
  formHeading!: string;
  buttonLabel: string = 'Add User';
  constructor(private apiService: CommonService, private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
    this.activatedRoute.paramMap.subscribe((param: any) => {
      this.userId = param.params.id;
    });
    this.config[this.config.length - 1].name = 'Save'
    if (this.userId) {
      this.config.filter(item => {
        if (item.fieldType === commonEnum.email) {
          item.disabled = true;
        }
        return item
      })
    }
    this.formHeading = this.userId ? commonEnum.editUser : commonEnum.addUser;
  }
  ngAfterViewInit() {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
    if (this.userId) {
      let index = this.config.findIndex((x: any) => x.fieldType == tableEnum.password)
      if (index != -1) this.config.splice(index, 1);
    }
    this.apiService.get(apiEndPoints.users).subscribe((res: any) => {
      this.userList = res
      this.activeAdmin = this.userList.filter((user: any) => {
        if (user.userRole === commonEnum.Admin && user.status === tableEnum.Active) {
          user['name'] = user.firstName + ' ' + user.lastName
          return user
        }
      });
    });
    this.apiService.get(apiEndPoints.user, this.userId).subscribe((res: any) => {
      this.userData = res;
      this.form.form.patchValue({
        firstName: res?.firstName,
        email: res?.email,
        lastName: res?.lastName,
        userRole: res?.userRole,
      })
    });

  }

  userModify(type: string) {
    this.trimFormValues();
    if (this.form.form.invalid) {
      this.form.form.markAllAsTouched();
    } else {
      if (this.currentUser.userRole === commonEnum.superAdmin) {
        this.adminListConfig[0].options = this.activeAdmin;
        const dialogRef = this.dialog.open(CommonDialogComponent, {
          data: {
            heading: modalData.assignAdmin,
            title: modalData.selectAdmin,
            config: this.adminListConfig
          },
        });
        dialogRef.afterClosed().subscribe((res: any) => {
          if (res) {
            this.updateData(type);
          }
        });
      }
    }
  }

  updateData(type: string) {
    const existingUser = this.userList.find((user: any) => user.email === this.form.form.value.email);
    if (existingUser) {
      this.apiService.errorMSG(errorMessage.alreadyEmailRegistered);
    } else {
      let data: addUser = {
        firstName: this.form.form.value.firstName,
        lastName: this.form.form.value.lastName,
        email: this.form.form.value.email ? this.form.form.value.email : this.userData.email,
        password: btoa(this.form.form.value.password),
        userRole: this.form.form.value.userRole,
        status: tableEnum.Active,
        assignTo: this.currentUser.id,
        createdBy: this.currentUser.id,
      }
      if (type == commonEnum.update) {
        data.status = this.userData.status,
          data.createdBy = this.userData.id,
          this.apiService.edit(apiEndPoints.user + this.userId, data).subscribe((res: any) => {
            this.apiService.successMSG(succssMessage.Updated)
            this.router.navigateByUrl(routes.user);
          })
      } else {
        this.apiService.add(apiEndPoints.users, data).subscribe((res: any) => {
          this.apiService.successMSG(succssMessage.userAdded)
          this.router.navigateByUrl(routes.user);
        })
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
}
