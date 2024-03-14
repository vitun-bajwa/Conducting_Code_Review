import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.sass']
})
export class CommonFilterComponent implements OnInit{
  @Input() tableData: any;
  @Output() filterData = new EventEmitter();
  ngOnInit(): void {
   this.tableData =  new MatTableDataSource<any>(this.tableData)
  }
  applyFilter(event: any) {
    debugger
    const filterValue = event?.target?.value;
    this.tableData.filter = filterValue.trim().toLowerCase();
    this.filterData.emit(this.tableData)
  }
}
