import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
// import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonService } from 'src/app/core/service/common.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {

  @Input() tableConfig: any;
  @Output() userInfo = new EventEmitter();
  @Output() userEditInfo = new EventEmitter();
  @Output() userDeleteInfo = new EventEmitter();
  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private apiService: CommonService){

  }

  tableData: any;
  tableConfiguration: any;

  ngOnChanges(){
    this.createTableData()
  }

  ngAfterViewInit() {
    //this.createTableData();
  }

  createTableData(){
    if(this.tableConfig) {
      this.tableConfiguration = {
        tableHeaders: this.tableConfig?.tableHeaders,
        tableData: this.tableConfig?.tableData
      }
      this.tableData = new MatTableDataSource<any>(this.tableConfiguration.tableData);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
    }
  }

  updateStatus(event: any){
    this.userInfo.emit(event);
  }

  editUser(userData: any){
    this.userEditInfo.emit(userData);
  }

  deleteUser(userData: any){
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        id: userData.id,
      },
    }).afterClosed().subscribe((res:any) => {
      this.userDeleteInfo.emit(userData);
    })
  }
}
