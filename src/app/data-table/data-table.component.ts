import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TicketService } from '../ticket.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import {GlobalConstant} from '../common/GlobalConstants';
import { ActivatedRoute ,Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  dataSource: MatTableDataSource<any>;
   searchKey:string;

  // ticketId :number;
  // editMode=false;
  // showForm :FormGroup;
constructor(private _ticketService:TicketService,private route : ActivatedRoute ){}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ticketId', 'userId', 'ticket', 'type', 'priority'];//,'createdBy'];//, 'actions'];

  ngOnInit() {
    // this.dataSource: DataTableDataSource<any>;
     this.getPage();
  
     
    // this.route.params
    // .subscribe(
    //   (params: Params) => {
    //       this.ticketId = +params['id'];
    //       this.editMode =params['id'] !=null;
    //       this.initForm();


    //   });
  }
  // private initForm(){
   
  //   let ticketName ='';
  //   let ticketType ='';
  //   let ticketDescription = '';
  //   let ticketPriority = '';
  //   let ticketAttached = '';
  //   if(this.editMode){
  //     const tick = this._ticketService.getTicket(this.ticketId);
  //     ticketName =tick.ticket;
  //     ticketType =tick.type;
  //     ticketDescription = tick.description;
  //     ticketPriority =tick.priority;


  //   }
  //   this.showForm = new FormGroup({
  //     'ticket' :new FormControl(ticketName),
  //     'type' :new FormControl(ticketType),
  //     'description' : new FormControl(ticketDescription),
  //     'priority' : new FormControl(ticketPriority)
  //   });

  // }

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
  openDialog(data, event: any): void {
    console.log("event triggered: "+data.ticketId);

     let ticketInfo: any = this.findById(data.ticketId);
  }

  findById(ticketId : number): any {

    return this._ticketService.findById(ticketId).subscribe(
        data=> {
          console.log(data);
        },
        (error)=>{
          console.log(error.error.message);
        });
  }



  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
    }
    
    applyFilter(){
    this.dataSource.filter=this.searchKey.trim().toLowerCase();
    } 
    
}