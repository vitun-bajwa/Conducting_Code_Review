import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/common.service';
import { currentUser } from 'src/app/core/models/common-config';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { commonEnum } from 'src/app/core/enums/common.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.sass'],
})
export class UserListingComponent {
  // tableConfig!: MatTableDataSource<any>;
  tableConfig: any;
  tableHeaders: any = [];
  usersConfig: any = [];
  pendingTableConfig: any;
  currentUser!: currentUser;
  formHeading: commonEnum = commonEnum.userModule;
  addBtn = {
    class: 'button',
    name: 'Add User'
  }
  userData: any;
  tableColumns: any[] = [];
  searchVal: Subject<boolean> = new Subject();

  constructor(private commonService: CommonService, private router: Router, public dialog: MatDialog) {
    this.getUserData();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('user')!);
    // this.currentUser = JSON.parse(this.currentUser)
  }

  getUserData() {
    this.commonService.get('users', '').subscribe((res: any) => {
      this.userData = res
      this.createData();
    });
  }

  createData() {
    let userData = [...this.userData]
    if (userData.length > 0) {
      this.tableColumns = Object?.keys(userData[0])?.filter((x: any) => {
        if (x != 'password' && x != 'AddUser' && x != 'id' && x != 'Sign-Up' && x != 'statusBtn') {
          return x;
        }
      });
      this.tableColumns.push('action')
    }
    userData = userData.filter((user: any, i) => {
      user['statusBtn'] = {
        name: user.status == 'Active' ? 'Active' : user.status == 'Inactive' ? 'Inactive' : 'Pending',
        class: 'statusBtn'
      }
      return user;
    });
    userData.filter((user: any, i) => {
      if (user.userRole == 'superAdmin') {
        userData.splice(i, 1);
      }
      if (this.currentUser.userRole == 'admin' && user.id == this.currentUser.id) {
        userData.splice(i, 1);
      }
    });
    if (this.currentUser.userRole == 'admin') userData = userData.filter((user: any) => user?.createdBy !== this.currentUser.id);
    let pendingUserData = [...userData]
    userData = userData.filter((x: any) => x.status != 'Pending');
    pendingUserData = pendingUserData.filter((x: any) => x.status == 'Pending');

    this.tableConfig = { tableHeaders: this.tableColumns, tableData: userData }
    this.pendingTableConfig = { tableHeaders: this.tableColumns, tableData: pendingUserData }
  }

  updateUserInfo(event: any) {
    let userData = this.userData.find((x: any) => x.id == event.id);
    userData['status'] = userData['status'] == 'Active' ? 'Inactive' : userData['status'] == 'Pending' ? 'Active' : 'Active';
    userData.statusBtn.name = userData['status']

    this.commonService.edit('users/' + userData.id, userData).subscribe((res: any) => {
      
    })
  }

  editUser(event: any) {
    this.router.navigateByUrl(`admin/edit/${event.id}`);
  }

  deleteUser(event: any) {
    this.commonService.delete('users/' + event).subscribe((res: any) => {
      this.getUserData();
    });
  }

  applyFilter(event: any) {
    this.searchVal.next(event?.target?.value);
  }

}
