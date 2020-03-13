import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { TicketService } from 'src/app/ticket.service';
import { TicketRequest } from 'src/app/dto/ticket-request';
import { DataSourceService } from 'src/app/service/DataSourceService';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';

@Component({
  selector: 'app-save-ticket-dialog',
  templateUrl: './save-ticket-dialog.component.html',
  styleUrls: ['./save-ticket-dialog.component.css']
})
export class SaveTicketDialogComponent implements OnInit {
  private ticketRequest: TicketRequest;
  showForm: boolean;
  ticket: string;
  type: string = 'Bug';
  priority: string = 'Low';
  severity: string = 'Low';
  description: string;
  base64textString: string | ArrayBuffer;
  fileExtension: string;
  isFileAttached: boolean;
  response: any;
  fileName: string;
  file: any;
  isFileUpload: boolean;
  submitValue : string ;
  isChanged : boolean = false;

  constructor(private _ticketService: TicketService, public dialogRef: MatDialogRef<SaveTicketDialogComponent>,
    private changeDetectorRefs: ChangeDetectorRef, private router: Router, private formBuilder: FormBuilder,
    private _dataSourceService: DataSourceService,private dialog :MatDialog ,@Inject(MAT_DIALOG_DATA) public data:any) {

    this.ticketRequest = new TicketRequest();
  }

  ngOnInit() {

  }

  onSubmit() {
    this.saveTicket();
    return this.router.navigateByUrl('/redirect-url');
    // window.location.reload();

  }

  onClose() {
    this.dialogRef.close();
  }

  onCancel(submitValue = "Cancel") {
    this.dialogRef.close();
  }

  saveTicket() {
    this.ticketRequest.userId = "vamsi@altimetrik.com";
    this.ticketRequest.type = this.type;
    this.ticketRequest.priority= this.priority;

    this._ticketService.saveTicketInfo(this.ticketRequest).subscribe(
    data => {
    if (data) {
    if(data.message){
    console.log("update functionality called....");
    this.data = data;
    this.openAlertDialog(this.data);
    }
    else if (data.ticketId){
    this._dataSourceService.updateData(data);
    // this.router.navigateByUrl('/redirect-url');
    }
    }
    },
    (error) => {
    console.log(error.error.message);
    }
    );
    // if (this.showForm) {
    // return this.router.navigateByUrl('/redirect-url');
    // }
    this.onClose();
    }

    openAlertDialog(data): void {
      const dialogConfig =new MatDialogConfig();
      dialogConfig.disableClose =true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="80%";
      dialogConfig.data = data;
      this.dialog.open(AlertdialogComponent,dialogConfig);
      }




  changeListener(file): void {
    this.readThis(file);
  }

  readThis(inputValue: File): void {
    // console.log("readThis..........."+inputValue);
    var file: File = inputValue;
    var myReader: FileReader = new FileReader();
    // console.log("our file is attached " + this.fileName);

    myReader.onloadend = (e) => {
      // console.log("this.image="+myReader.result);
      // let bufferImg: string | ArrayBuffer;

      this.base64textString = myReader.result;
      this.fileExtension = this.fileName.split(".")[1];
      // console.log("file extension updated " + this.fileExtension);
      if (this.base64textString) {
        this.isFileAttached = true;
        this.ticketRequest.fileBase64 = this.base64textString;
        this.ticketRequest.attached = this.isFileAttached;
        // console.log(this.base64textString);
      }
    }
    myReader.readAsDataURL(file);

  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      if(0==index){
        // console.log("index", index);
      const element = event[index];

      }
      this.file=event[index].name
      this.isFileUpload = true;
      // console.log(event+"---------"+event[0]);
      this.changeListener(event[0]);
    }
  }
  deleteAttachment(index) {
    console.log("index", index);
    // this.files.splice(index, 1);
    this.file = null;
    this.isFileUpload = false;
  }
  keyEvent(){
       if(( this.ticketRequest.ticket != '') &&  (this.ticketRequest.description  != ''))
       {
         this.isChanged= true;
         console.log("if called "+this.isChanged)
         document.getElementById("id02").style.backgroundColor='#E15D29';
       }
       else
       {
         this.isChanged = false;
         document.getElementById("id02").style.backgroundColor='grey';
       }
   }


}
