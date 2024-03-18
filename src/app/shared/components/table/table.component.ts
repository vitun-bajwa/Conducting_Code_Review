import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
// import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonService } from 'src/app/core/service/common.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FieldConfig } from 'src/app/core/models/field-config';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';
import { Router } from '@angular/router';
import { adminList, declineReason } from 'src/app/core/config/form.constant';
import { commonEnum, modalData, tableEnum } from 'src/app/core/enums/common.enum';
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
  enum: typeof tableEnum = tableEnum;

  constructor(public dialog: MatDialog, public commonService: CommonService, private router: Router) {
    this.currentUser = JSON.parse(sessionStorage.getItem('user')!);
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

  editUser(userData: any) {
    this.editInfo.emit(userData);
  }

  deleteUser(userData: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        id: userData.id,
      },
    })

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.deleteInfo.emit(userData.id);
        let i = this.tableConfig.tableData.findIndex((res: any) => res.id === userData.id);
        this.tableConfig.tableData.splice(i, 1);
        this.createTableData()
      }
    })
  }

  editRequest(userData: any) {
    if (userData.userRole === commonEnum.Candidate) {
      this.adminListConfig[0].options = this.tableConfig?.activeAdmin;
      const dialogRef = this.dialog.open(RequestDialogComponent, {
        data: {
          id: userData.id,
          heading: modalData.approveRequest,
          title: modalData.selectAdmin,
          config: this.adminListConfig
        },
      });
      dialogRef.afterClosed().subscribe((res: any) => {
        if (res) {
          userData['assignTo'] = res.assignTo;
          let i = this.tableConfig.tableData.findIndex((res: any) => res.id === userData.id);
          this.tableConfig.tableData.splice(i, 1);
          this.updateRequest.emit(userData);
          this.createTableData();
        }
      });
    } else if (userData.userRole === commonEnum.Admin) {
      let i = this.tableConfig.tableData.findIndex((res: any) => res.id === userData.id);
      this.tableConfig.tableData.splice(i, 1);
      this.updateRequest.emit(userData);
    }
  }

  deleteRequest(userData: any) {
    const dialogRef = this.dialog.open(RequestDialogComponent, {
      data: {
        id: userData.id,
        heading: modalData.declineRequest,
        title: modalData.declineTitle,
        config: this.configReview
      },
    })
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        userData['declinedReason'] = res.codeReview
        this.updateRequest.emit(userData);
        this.createTableData();
      }
    })
  }

  viewReview(data: any){
    this.viewCodeReview.emit(data);
  }
  
}
