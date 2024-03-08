import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/core/service/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UiModule } from 'src/app/ui/ui.module';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.sass'],
})
export class UserListingComponent {
  // tableConfig!: MatTableDataSource<any>;
  tableConfig : any;
  tableHeaders: any = [];
  usersConfig: any;
  constructor(private commonService: CommonService){

  }
  tableColumns : any[] = [];


  ngOnInit(){
    this.getUserData();
  }

  getUserData(){
    this.commonService.get('users', '').subscribe((res:any) => {
      this.usersConfig = res;
      this.tableColumns = Object.keys(res[0]).filter((x:any) => x != 'password');
      this.tableConfig = { tableHeaders: this.tableColumns, tableData: res}
    });
  }

  updateUserInfo(event: any){
    let userData = this.usersConfig.find((x:any) => x.id == event.id);
    userData['status'] = userData['status'] == 'Active' ? 'Inactive' : 'Active';
    this.commonService.edit('users/'+userData.id,userData).subscribe((res:any) => {
    })
  }
}
