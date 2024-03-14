import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { searchFeild } from 'src/app/core/config/form.constant';
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
  searchInput: FieldConfig = searchFeild
  searchList: Subject<boolean> = new Subject();
  searchRequest: Subject<boolean> = new Subject();
  addBtn = {
    class: 'button',
    name: 'Add Code Review'
  }

  constructor(private commonService: CommonService,
    private router: Router) {
    this.getReviewData();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('user')!);
    // this.currentUser = JSON.parse(this.currentUser)
  }

  getReviewData() {
    this.commonService.get('codeReview', '').subscribe((res: any) => {
      this.reviewData = res;
      // let index = this.reviewConfig.findIndex((x: any) => x.id == this.currentUser.id);
      // this.reviewConfig.splice(index, 1);
      // this.tableColumns = Object?.keys(this.reviewConfig[0])?.filter((x:any, i) => {
      //   if(x != 'textEditor' && x != 'AddReviewRequest' && x != 'id'){
      //     return x;
      //   }
      // });
      // this.tableColumns.push('action')
      // this.tableConfig = { tableHeaders: this.tableColumns, tableData: this.reviewConfig }
      this.createData();
    });
  }

  createData() {
    let userData = [...this.reviewData]
    if (userData.length > 0) {
      this.tableColumns = Object?.keys(userData[0])?.filter((x: any) => {
        if (x != 'textEditor' && x != 'AddReviewRequest' && x != 'id' && x != 'statusBtn') {
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

  editReview(event: any){
     this.router.navigateByUrl(`codeReview/edit/${event.id}`);
  }

  deleteReview(event: any){
    this.commonService.delete('codeReview/'+ event).subscribe((res: any) => {
      this.getReviewData();
    })
  }

  applyFilter(event: any, type?:string) {
    type == 'list' ? this.searchList.next(event?.target?.value) : this.searchRequest.next(event?.target?.value)
  }
  
}
