import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from 'src/app/core/service/common.service';
import { MatDialog } from '@angular/material/dialog';
import { FieldConfig } from 'src/app/core/models/field-config';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { adminList, declineReason } from 'src/app/core/config/form.constant';
import { commonEnum, getItem, modalData, routes, tableEnum } from 'src/app/core/enums/common.enum';
import { currentUser } from 'src/app/core/models/common-config';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {
  
  @Input() tableConfig: any;
  @Input() search: any;
  @Output() userInfo = new EventEmitter();
  @Output() editInfo = new EventEmitter();
  @Output() deleteInfo = new EventEmitter();
  @Output() updateRequest = new EventEmitter();
  @Output() viewCodeReview = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('form') form: any;
  tableData: any;
  tableConfiguration: any;
  userId!: string;
  adminListConfig: FieldConfig[] = adminList;
  configReview: FieldConfig[] = declineReason;
  currentUser: currentUser;
  commonEnum: typeof commonEnum = commonEnum;
  tableEnum: typeof tableEnum = tableEnum;
  editBtn = {
    name: "edit",
    class: 'icon edit',
    type : "icon"
  }
  deleteBtn = {
    name: "delete",
    class: 'icon delete',
    type : "icon"
  }
  visibilityBtn = {
    name: "visibility",
    class: 'icon edit',
    type : "icon"
  }
  infoBtn = {
    name: "info",
    class: 'icon edit',
    type : "icon"
  }
  closeBtn = {
    name: "close",
    class: 'icon delete',
    type : "icon"
  }
  constructor(public dialog: MatDialog, public commonService: CommonService) {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
   }

  ngOnChanges() {
    this.createTableData();
  }
  
  ngAfterViewInit() {
    if(this.tableConfig) {
      this.tableConfig.tableData.map((item:any) => {
        item.status = item.status.toLowerCase();
      })
    } 
    this.createTableData();
    this.search?.subscribe((val: string) => {
      const filterValue = val;
      this.tableData.filter = filterValue?.trim().toLowerCase();
    });
  }

  createTableData() {
    if (this.tableConfig) {
      this.tableConfiguration = {
        tableHeaders: this.tableConfig?.tableHeaders,
        tableData: this.tableConfig?.tableData
      }
      this.tableData = new MatTableDataSource<any>(this.tableConfiguration.tableData);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
    }
  }
  updateStatus(event: any) {
    this.userInfo.emit(event);
  }

  editRecord(userData: any) {
    this.editInfo.emit(userData);
  }

  deleteRecord(userData: any) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        id: userData.id,
        heading: this.tableConfig.page === routes.user ? modalData.deleteUser : modalData.deleteCodereview,
        title: modalData.deleteTitle,
      },
    })
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.updateData(userData);
        this.deleteInfo.emit(userData.id);
      }
    })
  }

  editRequest(data: any) {
    if(this.tableConfig.page == routes.user) {
      if (data.userRole === commonEnum.Candidate) {
        this.adminListConfig[0].options = this.tableConfig?.activeAdmin;
        const dialogRef = this.dialog.open(CommonDialogComponent, {
          data: {
            id: data.id,
            heading: modalData.approveRequest,
            title: modalData.selectAdmin,
            config: this.adminListConfig
          },
        });
        dialogRef.afterClosed().subscribe((res: any) => {
          if (res) {
            data['assignTo'] = res.assignTo;
            this.updateData(data);
            this.updateRequest.emit(data);
          }
        });
      } else if (data.userRole === commonEnum.Admin) {
        this.updateData(data);
        this.updateRequest.emit(data);
      }
    }else {
      this.updateData(data);
      this.updateRequest.emit(data);
    }
  }

  declineReason(data: any) {
    this.configReview[0].disabled = true;
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        declinedReason: data,
        heading: modalData.declinedRequest,
        title: modalData.declinedTitle,
        config: this.configReview
      },
    });
  }

  updateData(data: any) {
    let i = this.tableConfig.tableData.findIndex((res: any) => res.id === data.id);
    this.tableConfig.tableData.splice(i, 1);
    this.createTableData();
  }

  declineRequest(data: any) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        id: data.id,
        heading: modalData.declineRequest,
        title: modalData.declineTitle,
        config: this.configReview
      },
    })
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        data['declinedReason'] = res.codeReview
        this.updateRequest.emit(data);
        this.createTableData();
      }
    })
  }

  viewReview(data: any){
    this.viewCodeReview.emit(data);
  }

}
