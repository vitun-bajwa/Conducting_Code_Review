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
  constructor(private commonService: CommonService){

  }
  tableColumns : any[] = [];


  ngOnInit(){
    this.getUserData();
  }

  getUserData(){
    this.commonService.get('users', '').subscribe((res:any) => {
      this.tableColumns = Object.keys(res[0]).filter((x:any) => x != 'password');
      this.tableConfig = { tableHeaders: this.tableColumns, tableData: res}
    });
  }
}
