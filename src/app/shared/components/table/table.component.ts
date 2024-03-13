import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
// import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonService } from 'src/app/core/service/common.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {

  @Input() tableConfig: any;
  @Output() userInfo = new EventEmitter();
  @Output() editInfo = new EventEmitter();
  @Output() deleteInfo = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private apiService: CommonService) {

  }

  tableData: any;
  tableConfiguration: any;
  ngOnChanges() {
    // this.createTableData();
  }

  ngAfterViewInit() {
    this.createTableData();
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
    // this.cdr.detectChanges();
  }

  applyFilter(event: any) {
    const filterValue = event?.target?.value;
    this.tableData.filter = filterValue.trim().toLowerCase();
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
      if(res){
        this.deleteInfo.emit(userData.id);
      let i = this.tableConfig.tableData.findIndex((res: any) => res.id === userData.id);
      this.tableConfig.tableData.splice(i, 1);
      this.createTableData()
      }
      
    })
  }
}
