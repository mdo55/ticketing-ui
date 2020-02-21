import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { TicketService } from 'src/app/ticket.service';
import { MatDialogRef, MatTableDataSource, throwMatDialogContentAlreadyAttachedError, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogModule ,MatDialogConfig } from '@angular/material';
import { GlobalConstant } from 'src/app/common/GlobalConstants';
import { TicketRequest } from 'src/app/dto/ticket-request';
import { Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { identifierModuleUrl } from '@angular/compiler';
import { DataSourceService } from 'src/app/service/DataSourceService';
import { TicketDto } from 'src/app/dto/TicketDto';
import { TicketInfoDataSource } from 'src/app/datasource/ticketinfo-datasource';
// import { timingSafeEqual } from 'crypto';
// import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-ticket-info-dialog',
  templateUrl: './ticket-info-dialog.component.html',
  styleUrls: ['./ticket-info-dialog.component.css']
})
export class TicketInfoDialogComponent implements OnInit {

  private ticketRequest : TicketRequest;
  private cloneRequest : any[];
  base64textString:string | ArrayBuffer;
  isFileAttached:boolean;
  fileName: string;
  submitValue: string="Update";
  response: any;
  isChanged: boolean;
  isFileChanged: boolean;
  style: any;

  constructor(private _ticketService:TicketService, public dialogRef: MatDialogRef<TicketInfoDialogComponent>,
    private changeDetectorRefs: ChangeDetectorRef,private router: Router,
    private _dataSourceService: DataSourceService) {
    this.ticketRequest = new TicketRequest();
  }

  ngOnInit() {
    this.findById(GlobalConstant.findById);
  }

  onSubmit(){
    this.onClose();
    this.saveOrUpdateTicket();
  }

  onClose() {
    this.dialogRef.close();


  }

  onCancel(submitValue="Cancel") {
    this.dialogRef.close();
  }

  saveOrUpdateTicket(){
    console.log("data added"+this.ticketRequest)
    if(this.submitValue == "Update")
    {
      this.updateTicket();
    }
    else{
    this.submitValue =="Save";
    this.saveTicket();


    }
  }
  saveTicket(){
    this.ticketRequest.userId = "vamsi@altimetrik.com";
    this._ticketService.saveTicketInfo(this.ticketRequest).subscribe(
      data=>{
        if(data) {
          this._dataSourceService.updateData(data);
        //   this.router.navigateByUrl('/ticket-list', { skipLocationChange: true }).then(() => {
        //     this.router.navigate(['/ticket-list'], {skipLocationChange: true});
        // });

        }
      },
      (error)=>{
        console.log(error.error.message);
      }
    );

  }

  updateTicket(){
    this._ticketService.updateTicket(this.ticketRequest).subscribe(
      data=>{
        if(data)
        {
          // if(data.message){
          //   this.displayErrorMessage(data);
          // }
          // else{
            for(let i=0; i<this._dataSourceService.dSource.data.length; i++)
            {
              if(this.ticketRequest.ticketId==this._dataSourceService.dSource.data[i].ticketId)
              {
                this._dataSourceService.dSource.data[i]=this.ticketRequest;
              }
            }
        // }
        }
      },
      (error)=>{
        console.log(error.error.message);
      }
    );
  }
  // displayErrorMessage(data : any){
  // data.message;
  // }
  findById(ticketId : number): void {
    if(ticketId && this.submitValue == "Update"){
    this._ticketService.findById(ticketId).subscribe(
      data=> {
        this.ticketRequest = data;
        this.cloneRequest = this._dataSourceService.data.filter((value,index,arr) =>{
          if(value.ticketId == ticketId){
            return value;
          }
        });
        console.log("----------------"+this.cloneRequest[0].ticket);
        console.log("----------------"+this.cloneRequest[0].description);
      },
      (error)=>{
        console.log(error.error.message);
      });
    }

    else  {
      this.submitValue="Save";
      this.ticketRequest = new TicketRequest();
      this.ticketRequest.type="BUG";
      this.ticketRequest.priority="NORMAL";
    }
  }



  changeListener($event) : void
  {
    this.readThis($event.target);
    this.isChanged =true;
    document.getElementById("id02").style.backgroundColor=' #E15D29';
  }

  readThis(inputValue: any): void
  {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.readFileExtension(this.fileName);
      if(myReader.result){
          this.ticketRequest.attached=true;
          this.ticketRequest.fileBase64=myReader.result;
      }
    }
    if(file){
      myReader.readAsDataURL(file);
    }
  }



  readFileExtension(fileName: string) {
    if(fileName){
        this.ticketRequest.fileExtension=this.fileName.split(".")[1];
        console.log(this.ticketRequest);
    }
  }

  keyEvent(event){
    // console.log("clone"+this.cloneRequest[0].ticket)
    // console.log("original"+this.ticketRequest.ticket)

    if(this.submitValue == "Update")
   {
      // console.log("key triggered")
      let desc = this.cloneRequest[0].description;
      let tiket = this.cloneRequest[0].ticket;
      let types = this.cloneRequest[0].type;
      let prio = this.cloneRequest[0].priority;
      // let types = this.cloneRequest[0].type;

      // document.getElementById("id02").style.backgroundColor='grey';
      // console.log("ticket----"+this.ticketRequest.ticket)

      if((desc ==  this.ticketRequest.description) && (tiket == this.ticketRequest.ticket)
      && (types == this.ticketRequest.type) && (prio == this.ticketRequest.priority))
      {
        this.isChanged= false;
        document.getElementById("id02").style.backgroundColor='grey';
      }
      else
      {
        this.isChanged = true;
        document.getElementById("id02").style.backgroundColor=' #E15D29';
      }
      if((this.ticketRequest.ticket== '') || (this.ticketRequest.description == '')){
        this.isChanged = false;
        document.getElementById("id02").style.backgroundColor='grey';

      }
    }

   else if (this.submitValue=="Save") {
     this.isChanged=false;
    document.getElementById("id02").style["background-color"]="#E15D29";

    }

  }

}
