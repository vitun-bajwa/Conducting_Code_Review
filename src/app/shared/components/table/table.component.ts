import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {

  @Input() tableConfig: any;
  @Output() userInfo = new EventEmitter();
  @ViewChild(MatPaginator) paginator!:  MatPaginator;
  tableData: any;
  tableConfiguration: any;

  ngOnChanges(){
  }

  ngAfterViewInit() {
    if(this.tableConfig) {
      this.tableConfiguration = {
        tableHeaders: this.tableConfig?.tableHeaders,
        tableData: this.tableConfig?.tableData
      }
      this.tableData = new MatTableDataSource<any>(this.tableConfiguration.tableData);
      this.tableData.paginator = this.paginator;
    }
  }

  updateStatus(event: any){
    this.userInfo.emit(event);
  }

}
