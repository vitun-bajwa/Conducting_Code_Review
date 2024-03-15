import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { searchFeild } from 'src/app/core/config/form.constant';
import { commonEnum, apiEndPoints, setItem, tableEnum, getItem } from 'src/app/core/enums/common.enum';
import { currentUser } from 'src/app/core/models/common-config';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonService } from 'src/app/core/service/common.service';

@Component({
  selector: 'app-code-review-listing',
  templateUrl: './code-review-listing.component.html',
  styleUrls: ['./code-review-listing.component.sass']
})
export class CodeReviewListingComponent implements OnInit {
  tableConfig: any;
  tableHeaders: any = [];
  tableColumns: any[] = [];
  pendingTableConfig: any;
  reviewData: any;
  currentUser!: currentUser;
  searchInput: FieldConfig = searchFeild;
  formHeading: commonEnum = commonEnum.codeModule;
  searchList: Subject<boolean> = new Subject();
  searchRequest: Subject<boolean> = new Subject();
  activeTab: string = 'Code Review Listing';
  addBtn = {
    class: 'button',
    name: 'Add Code Review'
  }

  constructor(private commonService: CommonService,
    private router: Router) {
    this.getReviewData();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
  }

  getReviewData() {
    this.commonService.get(apiEndPoints.codeReview).subscribe((res: any) => {
      this.reviewData = res;
      this.createData();
    });
  }

  createData() {
    let userData = [...this.reviewData]
    if (userData.length > 0) {
      this.tableColumns = Object?.keys(userData[0])?.filter((x: any) => {
        if (x != tableEnum.textEditor && x != tableEnum.addReviewRequest && x != tableEnum.Id) {
          return x;
        }
      });
      this.tableColumns.push('action')
    }
    if (this.currentUser.userRole == commonEnum.Admin) userData = userData.filter((user: any) => user?.createdBy !== this.currentUser.id);
    let pendingUserData = [...userData]
    userData = userData.filter((x: any) => x.status != tableEnum.Pending);
    pendingUserData = pendingUserData.filter((x: any) => x.status == tableEnum.Pending);
    this.tableConfig = { tableHeaders: this.tableColumns, tableData: userData }
    this.pendingTableConfig = { tableHeaders: this.tableColumns, tableData: pendingUserData }
  }

  editReview(event: any){
     this.router.navigateByUrl(`codeReview/edit/${event.id}`);
  }

  deleteReview(event: any){
    this.commonService.delete(apiEndPoints.codeReview + event).subscribe((res: any) => {
      this.getReviewData();
    })
  }

  tabChange(e:any) {
    this.activeTab = e.tab.textLabel
    this.applyFilter('', this.activeTab)
    this.searchInput.value = ''
  }

  applyFilter(event: any, type?:string) {
    switch (type) {
      case 'Code Review Listing':
        event == '' ? this.searchList.next(event) : this.searchList.next(event?.target?.value)
      break;
      default : 
        event == '' ? this.searchRequest.next(event) : this.searchRequest.next(event?.target?.value)
      break;
    }
  }
  
}
