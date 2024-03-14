import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UiModule } from 'src/app/ui/ui.module';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { currentUser } from 'src/app/core/models/common-config';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.sass'],
})
export class UserListingComponent {
  // tableConfig!: MatTableDataSource<any>;
  tableConfig : any;
  tableHeaders: any = [];
  usersConfig: any=[];
  currentUser!: currentUser;

  addBtn = {
    class: 'button',
    name: 'Add User'
  }
  tableData: any;

  constructor(private commonService: CommonService, private router: Router, public dialog: MatDialog){
    this.getUserData();
  }
  tableColumns : any[] = [];


  ngOnInit(){
    this.currentUser = JSON.parse(sessionStorage.getItem('user')!);
    // this.currentUser = JSON.parse(this.currentUser)
  }

  getUserData(){
    this.commonService.get('users', '').subscribe((res:any) => {
      this.usersConfig = res;
      if (this.currentUser.userRole === 'superAdmin') {
        this.usersConfig = this.usersConfig?.filter((user: any) => user.userRole !== 'superAdmin' && user.id !== this.currentUser.id);
      } else if (this.currentUser.userRole === 'admin') {
        this.usersConfig = this.usersConfig?.filter((user: any) => user?.createdBy === this.currentUser.id);
      }
      if(this.usersConfig?.length > 0) {
        this.tableColumns = Object?.keys(this.usersConfig[0])?.filter((x:any, i) => {
          if(x != 'password' && x != 'AddUser' && x != 'id' && x != 'SignUp'){
            return x;
          }
        });
        this.tableColumns.push('action')
        this.usersConfig = this.usersConfig.map((item: any) => {
          if(item.status == 'Active') {
            item['statusBtn'] = {name: 'Active', class: 'statusBtn'}
          }else {
            item['statusBtn'] = {name: 'Inactive', class: 'statusBtn'}
          }
          return item;
        })
        this.tableConfig = { tableHeaders: this.tableColumns, tableData: this.usersConfig, type:'userTable'}
      }
    });
  }
  filter(event:any) {
    debugger
      this.tableData = event.filteredData.length;
  }
  updateUserInfo(event: any){
    let userData = this.usersConfig.find((x:any) => x.id == event.id);
    userData['status'] = userData['status'] == 'Active' ? 'Inactive' : 'Active';
    this.commonService.edit('users/'+userData.id,userData).subscribe((res:any) => {
    })
  }

  editUser(event: any){
    this.router.navigateByUrl(`admin/edit/${event.id}`);
  }

  deleteUser(event: any){
    this.commonService.delete('users/'+ event).subscribe((res: any) => {
      this.getUserData();
    });
  }
}
