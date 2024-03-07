import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {

  @Input() tableConfig: any;
  tableData: any;
  tableConfiguration: any;

  ngOnChanges(){
    this.tableConfiguration = {
      tableHeaders: this.tableConfig?.tableHeaders,
      tableData: this.tableConfig?.tableData
    }

    this.tableData = new MatTableDataSource<any>(this.tableConfiguration.tableData);
  }

}
