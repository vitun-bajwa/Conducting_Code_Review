import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/common.service';
import { currentUser } from 'src/app/core/models/common-config';
import { MatDialog } from '@angular/material/dialog';
import { commonEnum, apiEndPoints, succssMessage, tableEnum, getItem, routes } from 'src/app/core/enums/common.enum';
import { Subject } from 'rxjs';
import { FieldConfig } from 'src/app/core/models/field-config';
import { searchFeild } from 'src/app/core/config/form.constant';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.sass'],
})
export class UserListingComponent {
  tableConfig: any;
  tableHeaders: Array<object> = [];
  pendingTableConfig: any;
  currentUser!: currentUser;
  formHeading: commonEnum = commonEnum.userModule;
  searchInput: FieldConfig = searchFeild;
  addBtn = {
    class: 'button',
    name: 'Add User'
  }
  userData: any;
  activeTab: string = 'User Listing';
  searchList: Subject<boolean> = new Subject();
  searchRequest: Subject<boolean> = new Subject();

  constructor(private commonService: CommonService, private router: Router, public dialog: MatDialog) {
    this.getUserData();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
  }

  getUserData() {
    this.commonService.get(apiEndPoints.users).subscribe((res: any) => {
      this.userData = res
      if(this.userData) {
        this.userData.map((item:any) => {
          item.status = item.status.toLowerCase();
        })
      } 
      this.createData();
    });
  }

  createData() {
    let userData = [...this.userData]
    let tableColumns
    if (userData.length > 0) {
      tableColumns = Object?.keys(userData[0])?.filter((x: any) => (x != tableEnum.password && x != tableEnum.addUser && x != tableEnum.Id && x != tableEnum.statusBtn && x != tableEnum.assignTo && x != tableEnum.createdBy));
      tableColumns.push('action')
    }
    userData = userData.filter((user: any) => this.currentUser.userRole == commonEnum.superAdmin? user.id != this.currentUser.id : user.id != this.currentUser.id  && (user.assignTo == this.currentUser.id || user.createdBy == this.currentUser.id));
    userData.filter((user: any) => {
      user['statusBtn'] = {
        name: user.status == tableEnum.Active ? tableEnum.Active : user.status == tableEnum.Inactive ? tableEnum.Inactive : user.status === tableEnum.Rejected ? tableEnum.Rejected : tableEnum.Pending,
        class: 'statusBtn'
      }
    });
    let existingUser = userData.filter((user: any) => {
      if (user.userRole === commonEnum.Admin && user.status === tableEnum.Active) {
        user['name'] = user.firstName + ' ' + user.lastName
        return user
      }
    });
    let pendingUserData = [...userData]
    userData = userData.filter((x: any) => x.status != tableEnum.Pending && x.status != tableEnum.Rejected);
    pendingUserData = pendingUserData.filter((x: any) => x.status == tableEnum.Pending || x.status == tableEnum.Rejected);

    this.tableConfig = { tableHeaders: tableColumns, tableData: userData }
    this.pendingTableConfig = { tableHeaders: tableColumns, tableData: pendingUserData, activeAdmin: existingUser }
  }

  updateUserInfo(event: any) {
    let userData = this.userData.find((x: any) => x.id == event.id);
    if(userData['status'] != tableEnum.Pending) {
      userData['status'] = userData['status'] == tableEnum.Active ? tableEnum.Inactive : tableEnum.Active;
      userData.statusBtn.name = userData['status']
      this.commonService.edit(apiEndPoints.user + userData.id, userData).subscribe((res: any) => {
        if(res) {
          this.commonService.successMSG(succssMessage.statusUpdated)
        }
      })
    }
  }

  editUser(event: any) {
    this.router.navigateByUrl( routes.user+routes.edit+ event.id);
  }

  editRequest(userData: any) {
    let data: any = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      userRole: userData.userRole,
      createdBy: userData.createdBy,
      id: userData.id,
    }
    if(userData.declinedReason) {
      data['declinedReason'] = userData.declinedReason;
    }else {
      data['assignTo'] = {
        id: userData.assignTo.id,
        name: userData.assignTo.name,
      }
    }
    data['status'] = userData.declinedReason ? tableEnum.Rejected : tableEnum.Active
    this.commonService.edit(apiEndPoints.user + userData.id, data).subscribe((res: any) => {
      this.getUserData();
      this.commonService.successMSG(succssMessage.Updated)
    });
  }

  deleteUser(event: any) {
    this.commonService.delete(apiEndPoints.user + event).subscribe((res: any) => {
      this.getUserData();
    });
  }

  tabChange(e:any) {
    this.activeTab = e.tab.textLabel
    this.applyFilter('', this.activeTab)
    this.searchInput.value = ''
  }

  applyFilter(event: any, type?:string) {
    switch (type) {
      case 'User Listing':
        event == '' ? this.searchList.next(event) : this.searchList.next(event?.target?.value)
      break;
      default : 
        event == '' ? this.searchRequest.next(event) : this.searchRequest.next(event?.target?.value)
      break;
    }
  }

}
