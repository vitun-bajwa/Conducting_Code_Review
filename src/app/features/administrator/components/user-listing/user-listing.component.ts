import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/service/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UiModule } from 'src/app/ui/ui.module';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

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
  currentUser: any;
  addBtn = {
    class: 'button',
    name: 'Add User'
  }

  constructor(private commonService: CommonService, private router: Router, public dialog: MatDialog){
    this.getUserData();
  }
  tableColumns : any[] = [];


  ngOnInit(){
    this.currentUser = sessionStorage.getItem('user');
    this.currentUser = JSON.parse(this.currentUser)
  }

  getUserData(){
    this.commonService.get('users', '').subscribe((res:any) => {
      this.usersConfig = res;
      // let i = this.usersConfig.findIndex((x:any) => x.userRole == 'superAdmin'); 
      // let index = this.usersConfig.findIndex((x:any) => x.id == this.currentUser.id);
      // this.usersConfig.splice(i, 1);
      // if(i != index) {
      //   this.usersConfig.splice(index, 1);
      // }
      if (this.currentUser.userRole === 'superAdmin') {
        this.usersConfig = this.usersConfig?.filter((user: any) => user.userRole !== 'superAdmin' && user.id !== this.currentUser.id);
      } else if (this.currentUser.userRole === 'admin') {
        this.usersConfig = this.usersConfig?.filter((user: any) => user.createdBy === this.currentUser.id);
      }
      if(this.usersConfig?.length > 0) {
        this.tableColumns = Object?.keys(this.usersConfig[0])?.filter((x:any) => x != 'password');
        // this.tableColumns.splice(0, 0, 'Sno.')
        this.tableColumns.push('action')
        this.tableConfig = { tableHeaders: this.tableColumns, tableData: this.usersConfig}
      }
    });
  }

  // getUserData() {
  //   this.commonService.get('users', '').subscribe((res: any) => {
  //     let usersConfig = res;
  //     if (this.currentUser.userRole === 'superAdmin') {
  //       usersConfig = usersConfig.filter((user:any) => user.userRole !== 'superAdmin' && user.id !== this.currentUser.id);
  //     } else if (this.currentUser.userRole === 'admin') {
  //       usersConfig = usersConfig.filter((user:any) => user.createdBy === this.currentUser.id);
  //     }
      
  //     if (usersConfig.length > 0) {
  //       usersConfig.forEach((user:any, index:any) => {
  //         user.Sno = index + 1; 
  //       });
        
  //       this.tableColumns = Object.keys(usersConfig[0]).filter(x => x !== 'password');
  //       if (!this.tableColumns.includes('Sno')) {
  //         this.tableColumns.unshift('Sno'); 
  //       }
  //       if (!this.tableColumns.includes('action')) {
  //         this.tableColumns.push('action'); 
  //       }
  //       this.tableConfig = { tableHeaders: this.tableColumns, tableData: usersConfig };
  //     }
  //   });
  // }
   
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
    })

    //this.router.navigateByUrl(`admin/edit/${event.id}`);
  }
}
