import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/ticket.service';
import { MatDialogRef } from '@angular/material';
import { MatDialog, MatDialogModule ,MatDialogConfig } from '@angular/material';
import { GlobalConstant } from 'src/app/common/GlobalConstants';
import { TicketRequest } from 'src/app/module/Ticket-Request';



@Component({
  selector: 'app-ticket-info-dialog',
  templateUrl: './ticket-info-dialog.component.html',
  styleUrls: ['./ticket-info-dialog.component.css']
})
export class TicketInfoDialogComponent implements OnInit {
  private ticketRequest : TicketRequest;
  constructor(private _ticketService:TicketService, public dialogRef: MatDialogRef<TicketInfoDialogComponent>) { 
    this.ticketRequest = new TicketRequest();
  }

    ngOnInit() {
      console.log("dialog triggered")
      this.findById(GlobalConstant.findById);
    }
      onSubmit(){
        this.onClose();
      }
      onClose() {
        this.dialogRef.close();
      }

    findById(ticketId : number): void {

       this._ticketService.findById(ticketId).subscribe(
          data=> {
            this.ticketRequest = data;
            console.log(data);
          },
          (error)=>{
            console.log(error.error.message);
          });
    }

}
