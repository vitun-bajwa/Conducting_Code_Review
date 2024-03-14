import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UiModule } from 'src/app/ui/ui.module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';

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
  currentUser: any;
  addBtn = {
    class: 'button',
    name: 'Add User'
  }
  userData: any;
  tableColumns: any[] = [];

  constructor(private commonService: CommonService, private router: Router, public dialog: MatDialog) {
    this.getUserData();
  }


  ngOnInit() {
    this.currentUser = sessionStorage.getItem('user');
    this.currentUser = JSON.parse(this.currentUser)
  }

  getUserData() { 
    this.commonService.get('users', '').subscribe((res: any) => {
    this.userData = res
    this.createData();
    });
  }

  createData(param?:MatTabChangeEvent) {
    let userData = [...this.userData]
    userData = userData.filter((user: any, i) => {
      if(user.userRole == 'superAdmin') {
        userData.splice(i,1)
      }
      if(this.currentUser.userRole == 'admin' && user.id == this.currentUser.id) {
        userData.splice(i,1)
      }
      user['statusBtn'] = {
        name: user.status == 'Active' ? 'Active' : user.status == 'Inactive' ? 'Inactive' : 'Pending', 
        class: 'statusBtn'
      }
      return user
    });
    if(this.currentUser.userRole == 'admin') userData = userData.filter((user: any) => user?.createdBy === this.currentUser.id);
    if (userData.length > 0) {
      this.tableColumns = Object?.keys(userData[0])?.filter((x: any) => {
        if (x != 'password' && x != 'AddUser' && x != 'id' && x != 'Sign-Up') {
          return x;
        }
      });
      this.tableColumns.push('action')
    }
    let pendingUserData = [...userData]
    userData = userData.filter((x: any) => x.status != 'pending');
    pendingUserData = pendingUserData.filter((x: any) => x.status == 'pending');

    this.tableConfig = { tableHeaders: this.tableColumns, tableData: userData }
    this.pendingTableConfig = { tableHeaders: this.tableColumns, tableData: pendingUserData }
  }

  updateUserInfo(event: any) {
    let userData = this.userData.find((x: any) => x.id == event.id);
    userData['status'] = userData['status'] == 'Active' ? 'Inactive' : 'Active';
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
}
