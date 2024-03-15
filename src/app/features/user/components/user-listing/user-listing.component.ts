import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/common.service';
import { currentUser } from 'src/app/core/models/common-config';
import { MatDialog } from '@angular/material/dialog';
import { commonEnum, apiEndPoints, setItem, succssMessage, tableEnum, getItem } from 'src/app/core/enums/common.enum';
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
  tableColumns: any[] = [];
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
      this.createData();
    });
  }

  createData() {
    let userData = [...this.userData]
    if (userData.length > 0) {
      this.tableColumns = Object?.keys(userData[0])?.filter((x: any) => {
        if (x != tableEnum.password && x != tableEnum.addUser && x != tableEnum.Id && x != tableEnum.signUp && x != tableEnum.statusBtn && x != tableEnum.assignTo) {
          return x;
        }
      });
      this.tableColumns.push('action')
    }
    userData = userData.filter((user: any, i) => {
      user['statusBtn'] = {
        name: user.status == tableEnum.Active ? tableEnum.Active : user.status == tableEnum.Inactive ? tableEnum.Inactive : user.status === tableEnum.Rejected ? tableEnum.Rejected : tableEnum.Pending,
        class: 'statusBtn'
      }
      return user;
    });
    userData.filter((user: any, i) => {
      if (user.userRole == tableEnum.superAdmin) {
        userData.splice(i, 1);
      }
      if (this.currentUser.userRole == tableEnum.Admin && user.id == this.currentUser.id) {
        userData.splice(i, 1);
      }
    });
    let existingUser = userData.filter((user: any) => {
      if (user.userRole === tableEnum.Admin && user.status === tableEnum.Active) {
        user['name'] = user.firstName + ' ' + user.lastName
        return user
      }
    });
    if (this.currentUser.userRole == tableEnum.Admin) userData = userData.filter((user: any) => user?.createdBy !== this.currentUser.id);
    let pendingUserData = [...userData]
    userData = userData.filter((x: any) => x.status != tableEnum.Pending && x.status != tableEnum.Rejected);
    pendingUserData = pendingUserData.filter((x: any) => x.status == tableEnum.Pending || x.status == tableEnum.Rejected);

    this.tableConfig = { tableHeaders: this.tableColumns, tableData: userData }
    this.pendingTableConfig = { tableHeaders: this.tableColumns, tableData: pendingUserData, activeAdmin: existingUser }
  }

  updateUserInfo(event: any) {
    let userData = this.userData.find((x: any) => x.id == event.id);
    userData['status'] = userData['status'] == tableEnum.Active ? tableEnum.Inactive : userData['status'] == tableEnum.Pending ? tableEnum.Active : tableEnum.Active;
    userData.statusBtn.name = userData['status']
    this.commonService.edit(apiEndPoints.user + userData.id, userData).subscribe((res: any) => {
      if(res) {
        this.commonService.successMSG(succssMessage.statusUpdated)
      }
    })
  }

  editUser(event: any) {
    this.router.navigateByUrl( 'user/edit'+'/'+ event.id);
  }

  editRequest(userData: any) {
    let data: any = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      userRole: userData.userRole,
      id: userData.id,
    }
    if(userData.declinedReason) data['declinedReason'] = userData.declinedReason;
    data.status = userData.type == tableEnum.Request ? tableEnum.Active : tableEnum.Rejected
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
