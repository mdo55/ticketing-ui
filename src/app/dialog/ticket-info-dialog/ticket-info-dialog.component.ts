import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { TicketService } from 'src/app/ticket.service';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogModule ,MatDialogConfig } from '@angular/material';
import { GlobalConstant } from 'src/app/common/GlobalConstants';
import { TicketRequest } from 'src/app/dto/ticket-request';
import { Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-ticket-info-dialog',
  templateUrl: './ticket-info-dialog.component.html',
  styleUrls: ['./ticket-info-dialog.component.css']
})
export class TicketInfoDialogComponent implements OnInit {
  
  private ticketRequest : TicketRequest;
  private cloneRequest : any[7];
  base64textString:string | ArrayBuffer;
  isFileAttached:boolean;
  fileName: string;
  submitValue: string="Update";
  response: any;
  isChanged: boolean;
  style: any;
  constructor(private _ticketService:TicketService, public dialogRef: MatDialogRef<TicketInfoDialogComponent>, 
    private changeDetectorRefs: ChangeDetectorRef,private router: Router) { 
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
    else {
     this.saveTicket();
    }
  }
  saveTicket(){

    this.ticketRequest.userId = "vamsi@altimetrik.com";
    this._ticketService.saveTicketInfo(this.ticketRequest).subscribe(
      data=>{
        if(data) {
          GlobalConstant.dataSource.data.push(data);
          GlobalConstant.dataSource.sort = GlobalConstant.dataSource.sort;
          GlobalConstant.dataSource.paginator = GlobalConstant.dataSource.paginator;
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
        if(data) {
          for(let i=0; i<GlobalConstant.dataSource.data.length; i++){
            if(this.ticketRequest.ticketId==GlobalConstant.dataSource.data[i].ticketId){
              GlobalConstant.dataSource.data[i]=this.ticketRequest;
            }
          }
        }
      },
      (error)=>{
        console.log(error.error.message);
      }
    );
  }
  findById(ticketId : number): void {
    if(ticketId && this.submitValue == "Update"){
    this._ticketService.findById(ticketId).subscribe(
      data=> {
        this.ticketRequest = data; 
        this.cloneRequest = GlobalConstant.data.filter((value,index,arr) =>{
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
    else {
      this.submitValue="New";
      this.ticketRequest = new TicketRequest();
      this.ticketRequest.type="BUG";
      this.ticketRequest.priority="NORMAL";
    }
  }

  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
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

    
    if(this.submitValue == "Update") {
      console.log("key triggered")
      let desc = this.cloneRequest[0].description;
      let tiket = this.cloneRequest[0].ticket;
      if((desc ==  this.ticketRequest.description) || (tiket == this.ticketRequest.ticket)){
        this.isChanged= false;
        document.getElementById("id02").style.backgroundColor='grey';
        console.log("clone----"+this.ticketRequest.ticket)
        console.log("original----"+this.ticketRequest.description)
      } else {
        console.log("else triggered")
        this.isChanged = true;
        document.getElementById("id02").style.backgroundColor=' #4CAF50';
      }
    } else {
      this.isChanged = false;
      document.getElementById("id02").style.backgroundColor='grey';
    
    }
  }

}
