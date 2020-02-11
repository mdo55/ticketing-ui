import { Component, OnInit, Output } from '@angular/core';

import { CheckboxControlValueAccessor } from '@angular/forms';
import { EventEmitter } from 'events';
import { Options } from 'selenium-webdriver/opera';

import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog , MatDialogConfig } from '@angular/material';
import { TicketService } from 'src/app/ticket.service';
import { GlobalConstant } from 'src/app/common/GlobalConstants';

@Component({
  selector: 'app-save-ticket',
  templateUrl: './save-ticket.component.html',
  styleUrls: ['./save-ticket.component.css']
})

export class SaveTicketComponent implements OnInit {
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

previewUrl:any = null;
  @Output() closeModalEvent = new EventEmitter();



  constructor(private _ticketService:TicketService, private domSanitizer: DomSanitizer) {
    this.showForm = false;
   }

  ngOnInit() {
  }


  saveTicketInfo(event:any){

   // console.log('submitted...');

    event.preventDefault();
    this.showForm = true;
    document.getElementById('id01').style.visibility="hidden";
    //  this.readThis(event.target);

    let saveRequest: any = {
      userId: "vamsi@altimetrik.com",
      ticket: this.ticket,
      description: this.description,

      attached: this.isFileAttached,
      type: this.type,
      priority: this.priority,
      fileBase64: this.base64textString,
      fileExtension: this.fileExtension
    };

   this._ticketService.saveTicketInfo(saveRequest).subscribe(
      data=>{
        console.log(data);
        this.response=data;
        if(data) {
          GlobalConstant.dataSource.data.push(data);
          GlobalConstant.dataSource= new MatTableDataSource( GlobalConstant.dataSource.data);
          console.log("display all"+ GlobalConstant.dataSource.data);
        }
      },
      (error)=>{
        console.log(error.error.message);
      }
    );
    this.ticket="";
    this.type="BUG";
    this.priority="NORMAL";
    this.description="";
    this.isFileAttached=false;

  }
  changeListener($event) : void {

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
          console.log(this.base64textString);
      }

    }
    myReader.readAsDataURL(file);
  }

displayPop(event:any)
{
  console.log('triggered')
  document.getElementById('id01').style.display='block';
  document.getElementById('id01').style.visibility='';
  this.showForm = false;

}

}
