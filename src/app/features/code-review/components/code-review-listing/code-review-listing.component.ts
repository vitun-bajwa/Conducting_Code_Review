import { Component, OnInit } from '@angular/core';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommonService } from 'src/app/core/service/common.service';
// import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
// import { Essentials } from '@ckeditor/ckeditor5-essentials';
// import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
// import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
// import { Image } from '@ckeditor/ckeditor5-image';
// import { List } from '@ckeditor/ckeditor5-list';
// import { Autoformat } from '@ckeditor/ckeditor5-autoformat';

// import { Comments } from '@ckeditor/ckeditor5-comments';

@Component({
  selector: 'app-code-review-listing',
  templateUrl: './code-review-listing.component.html',
  styleUrls: ['./code-review-listing.component.sass']
})
export class CodeReviewListingComponent implements OnInit {
  tableConfig: any;
  tableHeaders: any = [];
  tableColumns: any[] = [];
  usersConfig: any;
  currentUser: any;
  constructor(private commonService: CommonService) {
    this.getUserData();
  }
  addBtn = {
    class: 'button',
    name: 'Add Code'
  }
  ngOnInit() {
    this.currentUser = sessionStorage.getItem('user');
    this.currentUser = JSON.parse(this.currentUser)
  }
  getUserData() {
    this.commonService.get('codeReview', '').subscribe((res: any) => {
      this.usersConfig = res;
      let index = this.usersConfig.findIndex((x: any) => x.id == this.currentUser.id);
      this.usersConfig.splice(index, 1);
      this.tableColumns = Object.keys(this.usersConfig[0]).filter((x: any) => x != 'password');
      this.tableColumns.push('action')
      this.tableConfig = { tableHeaders: this.tableColumns, tableData: this.usersConfig }
    });
  }
  updateUserInfo(event: any){
    let userData = this.usersConfig.find((x:any) => x.id == event.id);
    userData['status'] = userData['status'] == 'Active' ? 'Inactive' : 'Active';
    this.commonService.edit('users/'+userData.id,userData).subscribe((res:any) => {
    })
  }
}
