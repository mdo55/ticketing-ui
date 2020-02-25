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
    //  this.openAlertDialog.open(event);
    //  data.message;
      // console.log(data.message);
      // this.openAlertDialog(data);
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
  
          if(data.message){
            console.log("update functionality called....");
            this.data = data;
            // this.displayErrorMessage(data);
            console.log("------"+this.data.message);
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
    if(ticketId && this.submitValue == "Update"){
    this._ticketService.findById(ticketId).subscribe(
      data=> {
        this.ticketRequest = data;
        this.cloneRequest = this._dataSourceService.data.filter((value) =>{
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

    myReader.onloadend = () => {
      this.readFileExtension(this.fileName);
      if (myReader.result) {
        this.ticketRequest.attached = true;
        this.ticketRequest.fileBase64 = myReader.result;
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
  
  openAlertDialog(data): void {
    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose =true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="80%";
    // let ticketInfo: any = this.findById(data.ticketId);
    dialogConfig.data = data;
    // this.displayErrorMessage(data);
    this.dialog.open(AlertdialogComponent,dialogConfig);
    }


}
