import { Component } from '@angular/core';
import { CommonService } from 'src/app/core/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UiModule } from 'src/app/ui/ui.module';

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
