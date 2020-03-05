import { Component, OnInit, ChangeDetectorRef, Inject} from '@angular/core';
import { TicketService } from 'src/app/ticket.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GlobalConstant } from 'src/app/common/GlobalConstants';
import { TicketRequest } from 'src/app/dto/ticket-request';
import { Router } from '@angular/router';
import { DataSourceService } from 'src/app/service/DataSourceService';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';


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
  file: any;
  isFileUpload: boolean;

  constructor(private _ticketService:TicketService, public dialogRef: MatDialogRef<TicketInfoDialogComponent>,
    private dialog :MatDialog,
    private _dataSourceService: DataSourceService,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.ticketRequest = new TicketRequest();

  }

  ngOnInit() {
    this.findById(GlobalConstant.findById);
  }

  onSubmit(){
    this.onClose();
    this.saveOrUpdateTicket();

    }
  displayErrorMessage(data : any){
  }

  onClose() {
    this.dialogRef.close();
  }

  onCancel() {
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
          if(data.message){
            console.log("update functionality called....");
            this.data = data;
            this.openAlertDialog(this.data);
          }
          else{
            for(let i=0; i<this._dataSourceService.dSource.data.length; i++)
            {
              if(this.ticketRequest.ticketId==this._dataSourceService.dSource.data[i].ticketId)
              {
                this._dataSourceService.dSource.data[i]=this.ticketRequest;
              }
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
    this.isFileUpload = true;
    // this.file=
    if(ticketId && this.submitValue == "Update") {
    this._ticketService.findById(ticketId).subscribe(
      data=> {
        this.ticketRequest = data;
        this.base64textString = data.fileBase64;
        // console.log(this.base64textString);
        this.cloneRequest = this._dataSourceService.data.filter((value) =>{
          if(value.ticketId == ticketId){
            return value;
          }
        });
      },
      (error)=>{
        console.log(error.error.message);
      });
    }
    else  {
      this.submitValue="Save";
      this.ticketRequest = new TicketRequest();
      this.ticketRequest.type="Bug";
      this.ticketRequest.priority="Low";
      this.ticketRequest.severity="Low"
    }
  }

  changeListener(file) : void
  {
    this.readThis(file);
    this.isChanged =true;
    document.getElementById("id02").style.backgroundColor=' #E15D29';
  }

  readThis(inputValue: File): void
  {
    console.log("readThis..........."+inputValue);
    var file: File = inputValue;
    var myReader: FileReader = new FileReader();
    console.log("our file is attached " + this.fileName);

    myReader.onloadend = () => {
      this.readFileExtension(this.fileName);
      if (myReader.result) {
        this.ticketRequest.attached = true;
        this.ticketRequest.fileBase64 = myReader.result;
        this.base64textString = this.ticketRequest.fileBase64;
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

  keyEvent(){
   
   if(this.submitValue == "Update")
   {
      let desc = this.cloneRequest[0].description;
      let tiket = this.cloneRequest[0].ticket;
      let types = this.cloneRequest[0].type;
      let prio = this.cloneRequest[0].priority;

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

  openAlertDialog(data): void {
    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose =true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="80%";
    dialogConfig.data = data;
    this.dialog.open(AlertdialogComponent,dialogConfig);
    }

    uploadFile(event) {
      for (let index = 0; index < event.length; index++) {
        if(0==index){
          console.log("index", index);
        const element = event[index];

        }
        this.file=event[index].name
        this.isFileUpload = true;
        this.changeListener(event[0]);
      }
    }
    deleteAttachment(index) {
      console.log("index", index);
      // this.files.splice(index, 1);
      this.file = null;
      this.isFileUpload = false;
    }
}
