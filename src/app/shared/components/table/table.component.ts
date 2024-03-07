import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {

  @Input() tableConfig: any;
  @Output() userInfo = new EventEmitter();
  tableData: any;
  tableConfiguration: any;

  ngOnChanges(){
    this.tableConfiguration = {
      tableHeaders: this.tableConfig?.tableHeaders,
      tableData: this.tableConfig?.tableData
    }

    this.tableData = new MatTableDataSource<any>(this.tableConfiguration.tableData);
  }

  updateStatus(event: any){
    this.userInfo.emit(event);
  }

}
