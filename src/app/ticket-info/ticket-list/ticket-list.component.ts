import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog'
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { FormGroup, FormControl } from '@angular/forms';
// import { TicketGenerationComponent } from '../ticket-generation/ticket-generation.component';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

import { MatDialogRef } from '@angular/material';
import { GlobalConstant } from 'src/app/common/GlobalConstants';
import { TicketService } from 'src/app/ticket.service';
import { TicketInfoDialogComponent } from 'src/app/dialog/ticket-info-dialog/ticket-info-dialog.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { TicketRequest } from 'src/app/dto/ticket-request';
// import { SaveTicketComponent } from 'src/app/ticket-info/save-ticket/save-ticket.component';
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  dataSource: MatTableDataSource<any>;

   searchKey:string;
   private ticketRequest : TicketRequest;
   ticket: string;
  type: string;
  priority: string;
  description:string;
  uploadFile: File;
   base64textString:string | ArrayBuffer;
  fileExtension: string;
  isFileAttached:boolean;
  response:any;
  fileName: string;
  showForm: boolean;
  
 
 
constructor(private _ticketService:TicketService, private dialog :MatDialog){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ticketId', 'userId', 'ticket', 'type', 'priority'];//,'createdBy'];//, 'actions'];

  ngOnInit() {
    // this.dataSource: DataTableDataSource<any>;
    console.log("init triggered")
     this.getPage(event);
     
  }
 
  getPage(event){

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
  openDialog(data, event: any): void {
    
     const dialogConfig =new MatDialogConfig();
    // dialogConfig.disableClose =true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="80%";
    // let ticketInfo: any = this.findById(data.ticketId);
   GlobalConstant.findById = data.ticketId;
    this.dialog.open(TicketInfoDialogComponent,dialogConfig);

  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter=this.searchKey.trim().toLowerCase();
  }

  
  displayPop(event:any)
  {

    const dialogConfig =new MatDialogConfig();
    
    dialogConfig.autoFocus=true;
    dialogConfig.width="80%";
    GlobalConstant.findById = null;
    this.dialog.open(TicketInfoDialogComponent,dialogConfig);
    
  }
  
}

