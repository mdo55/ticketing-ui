import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { TicketService } from 'src/app/ticket.service';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogModule ,MatDialogConfig } from '@angular/material';
import { GlobalConstant } from 'src/app/common/GlobalConstants';
import { TicketRequest } from 'src/app/dto/ticket-request';

@Component({
  selector: 'app-ticket-info-dialog',
  templateUrl: './ticket-info-dialog.component.html',
  styleUrls: ['./ticket-info-dialog.component.css']
})
export class TicketInfoDialogComponent implements OnInit {
  
  private ticketRequest : TicketRequest;

  base64textString:string | ArrayBuffer;
 isFileAttached:boolean;
 fileName: string;
submitValue: string="Update";

  constructor(private _ticketService:TicketService, public dialogRef: MatDialogRef<TicketInfoDialogComponent>, 
    private changeDetectorRefs: ChangeDetectorRef) { 
    this.ticketRequest = new TicketRequest();
  }

  ngOnInit() {
    console.log("dialog triggered")
    this.findById(GlobalConstant.findById);
  }
  onSubmit(){
    this.onClose();
  this.updateTicket();
  
  }
  
  
  onClose() {
    this.dialogRef.close();
    this.refresh();

  }
  refresh(): any {
  
  }

  updateTicket(){
    console.log("data added"+this.ticketRequest)

 this._ticketService.updateTicket(this.ticketRequest).subscribe(
      data=>{
        // console.log(data);
        if(data) {
          for(let i=0; i<GlobalConstant.dataSource.data.length; i++){
            if(this.ticketRequest.ticketId==GlobalConstant.dataSource.data[i].ticketId){
              GlobalConstant.dataSource.data[i]=this.ticketRequest;
              // GlobalConstant.dataSource= new MatTableDataSource( GlobalConstant.dataSource.data);
              // GlobalConstant.dataSource._updatePaginator(GlobalConstant.dataSource.data.length);
              // this.changeDetectorRefs.detectChanges();
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
        // console.log("if condition triggered");
      },
      (error)=>{
        console.log(error.error.message);
      });
    }
    else {
      // console.log("else triggered")
      this.submitValue="Save";
      this.ticketRequest = new TicketRequest();
     
      // this.ticketRequest.ticket="";
      this.ticketRequest.type="BUG";
      this.ticketRequest.priority="NORMAL";
      // this.ticketRequest.description="";
      // this.isFileAttached=false;
      // this.ticketRequest.fileBase64=null;
    }
  
  }

  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      // this.base64textString = myReader.result;
      this.readFileExtension(this.fileName);
      if(myReader.result){
          // this.isFileAttached=true;
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
}
