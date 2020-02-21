import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { TicketService } from 'src/app/ticket.service';
import { TicketRequest } from 'src/app/dto/ticket-request';
import { DataSourceService } from 'src/app/service/DataSourceService';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-save-ticket-dialog',
  templateUrl: './save-ticket-dialog.component.html',
  styleUrls: ['./save-ticket-dialog.component.css']
})
export class SaveTicketDialogComponent implements OnInit {
  private ticketRequest : TicketRequest;
  showForm: boolean;
  ticket: string;
  type: string='BUG';
  priority: string='MEDIUM';
  description:string;
  uploadFile: File;
  base64textString:string | ArrayBuffer;
  fileExtension: string;
  isFileAttached:boolean;
  response:any;
  fileName: string;

  constructor(private _ticketService:TicketService, public dialogRef: MatDialogRef<SaveTicketDialogComponent>,
    private changeDetectorRefs: ChangeDetectorRef,private router: Router,private formBuilder: FormBuilder,
    private _dataSourceService: DataSourceService) {

      this.ticketRequest = new TicketRequest();
     }

  ngOnInit() {
  }
  onSubmit(){
    this.onClose();
    this.saveTicket();
  }

  onClose() {
    this.dialogRef.close();
  }

  onCancel(submitValue="Cancel") {
    this.dialogRef.close();
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
    if(this.showForm){
      return this.router.navigateByUrl('/ticket-list');
    }

  }
  changeListener($event) : void {
    console.log("changeListener triggered ")
        this.readThis($event.target);
      }
    
      readThis(inputValue: any): void {
        var file:File = inputValue.files[0];
        var myReader:FileReader = new FileReader();
        console.log("our file is attached "+this.fileName);
    
        myReader.onloadend = (e) => {
          // console.log("this.image="+myReader.result);
          // let bufferImg: string | ArrayBuffer;
    
    
          this.base64textString = myReader.result;
          this.fileExtension = this.fileName.split(".")[1];
          console.log("file extension updated "+this.fileExtension);
          if(this.base64textString){
              this.isFileAttached=true;
              // console.log(this.base64textString);
          }
        }
        myReader.readAsDataURL(file);
      }

      displayPop(event:any)
{
  document.getElementById('id01').style.display='block';
  document.getElementById('id01').style.visibility='';
  this.showForm = false;
}


}
