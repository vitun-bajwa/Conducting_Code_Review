import { Component } from '@angular/core';
import { CommonService } from 'src/app/core/service/common.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.sass'],
})
export class UserListingComponent {
  tableConfig: any;
  constructor(private commonService: CommonService){

  }
  tableColumns: string[] = ['position', 'name', 'email', 'Status'];


  ngOnInit(){
    this.getUserData();
  }

  getUserData(){
    this.commonService.get('users').subscribe((res:any) => {
      
      this.tableConfig = { tableHeaders: this.tableColumns, tableData: res};
    })
  }
}
