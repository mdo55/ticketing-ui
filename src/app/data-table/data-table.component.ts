import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import { TicketService } from '../ticket.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import {GlobalConstant} from '../common/GlobalConstants';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  dataSource: MatTableDataSource<any>;
constructor(private _ticketService:TicketService){}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ticketId', 'userId', 'ticket', 'type', 'priority'];//,'createdBy'];//, 'actions'];

  ngOnInit() {
    // this.dataSource: DataTableDataSource<any>;
    this.getPage();
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  getPage(){

this._ticketService.getPage().subscribe(
  data=>{
    let content: [] = data['content'];
    if(content) {
      GlobalConstant.data = content;
      GlobalConstant.dataSource =  new MatTableDataSource(GlobalConstant.data);

    }
    this.dataSource = GlobalConstant.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  },
(error)=>{
  console.log(error.error.message);
});

}

saveTicketInfo(){


}
}
