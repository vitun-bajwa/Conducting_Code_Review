import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  reviewConfig: any;
  currentUser: any;
  constructor(private commonService: CommonService,
    private router: Router) {
    this.getReviewData();
  }
  addBtn = {
    class: 'button',
    name: 'Add Code Review'
  }
  ngOnInit() {
    this.currentUser = sessionStorage.getItem('user');
    this.currentUser = JSON.parse(this.currentUser)
  }
  getReviewData() {
    this.commonService.get('codeReview', '').subscribe((res: any) => {
      this.reviewConfig = res;
      let index = this.reviewConfig.findIndex((x: any) => x.id == this.currentUser.id);
      this.tableColumns = Object?.keys(this.reviewConfig[0])?.filter((x:any, i) => {
        if(x != 'textEditor' && x != 'AddReviewRequest' && x != 'id'){
          return x;
        }
      });
      
      this.tableColumns.push('action')
      this.tableConfig = { tableHeaders: this.tableColumns, tableData: this.reviewConfig }
    });
  }

  editReview(event: any){
     this.router.navigateByUrl(`codeReview/edit/${event.id}`);
  }

  deleteReview(event: any){
    this.commonService.delete('codeReview/'+ event).subscribe((res: any) => {
      this.getReviewData();
    })
  }
}
