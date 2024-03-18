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
  pendingTableConfig: any;
  reviewData: any;
  currentUser!: currentUser;
  searchInput: FieldConfig = searchFeild;
  enum: typeof commonEnum = commonEnum;
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
    this.commonService.get(apiEndPoints.codeReviews).subscribe((res: any) => {
      this.reviewData = res;
      this.createData();
    });
  }

  createData() {
    let reviewData = [...this.reviewData]
    let tableColumns
    let pendingTableColumns
    if (reviewData.length > 0) {
      tableColumns = Object?.keys(reviewData[0])?.filter((x: any) => 
      this.currentUser.userRole != commonEnum.superAdmin ? 
      (x != tableEnum.textEditor && x != tableEnum.addReviewRequest && x != tableEnum.Id && x != tableEnum.userId && x != tableEnum.assignTo) : 
      (x != tableEnum.textEditor && x != tableEnum.addReviewRequest && x != tableEnum.Id && x != tableEnum.userId));
      tableColumns.push('action')
      pendingTableColumns = Object?.keys(reviewData[0])?.filter((x: any) => 
      this.currentUser.userRole != commonEnum.superAdmin ? 
      (x != tableEnum.textEditor && x != tableEnum.addReviewRequest && x != tableEnum.Id && x != tableEnum.userId && x != tableEnum.assignTo && x != tableEnum.codeReview) :
      (x != tableEnum.textEditor && x != tableEnum.addReviewRequest && x != tableEnum.Id && x != tableEnum.userId && x != tableEnum.codeReview)
      );
      if(this.currentUser.userRole != commonEnum.Candidate) pendingTableColumns.push('action');
    }
    if(this.currentUser.userRole != commonEnum.superAdmin) {
      reviewData = reviewData.filter((item: any) => this.currentUser.userRole != commonEnum.Candidate? item.assignTo.id == this.currentUser.id : item.userId == this.currentUser.id);
    }
    reviewData.filter((item: any) => {
      item['statusBtn'] = {
        name: item.status.toLowerCase() == tableEnum.Active ? tableEnum.Active : item.status.toLowerCase() == tableEnum.Inactive ? tableEnum.Inactive : item.status.toLowerCase() === tableEnum.Rejected ? tableEnum.Rejected : item.status.toLowerCase() === tableEnum.Reviewed ? tableEnum.Reviewed : tableEnum.Pending,
        class: (item.status.toLowerCase() == tableEnum.Pending || item.status.toLowerCase() == tableEnum.Reviewed || item.status.toLowerCase() == tableEnum.Rejected ) ? 'statusBtn statusBtnNonClick' : 'statusBtn'
      }
    });
    let pendingreviewData = [...reviewData]
    // userData = userData.filter((x: any) => x.status == 'Reviewed');
    reviewData = reviewData.filter((x: any) => x.status.toLowerCase() == tableEnum.Reviewed);
    pendingreviewData = pendingreviewData.filter((x: any) => x.status.toLowerCase() == tableEnum.Pending);
    this.tableConfig = { tableHeaders: tableColumns, tableData: reviewData }
    this.pendingTableConfig = { tableHeaders: pendingTableColumns, tableData: pendingreviewData }
  }

  editReview(event: any) {
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

  viewCodeReview(event: any){
    this.router.navigateByUrl(`codeReview/view/${event.id}`);
  }
}
