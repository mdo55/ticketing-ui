import { Component, OnInit, Output} from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder } from '@angular/forms';
import { EventEmitter } from 'events';
import { Options } from 'selenium-webdriver/opera';

import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog , MatDialogConfig } from '@angular/material';
import { TicketService } from 'src/app/ticket.service';
import { GlobalConstant } from 'src/app/common/GlobalConstants';
import { Router, UrlTree } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { DataSourceService } from 'src/app/service/DataSourceService';
import { SaveTicketDialogComponent } from 'src/app/dialog/save-ticket-dialog/save-ticket-dialog.component';


@Component({
  selector: 'app-save-ticket',
  templateUrl: './save-ticket.component.html',
  styleUrls: ['./save-ticket.component.css']
})

export class SaveTicketComponent implements OnInit{
 showForm: boolean;
 ticket: string;
 type: string =  "Bug";
 priority: string = "Low";
 description:string;
 uploadFile: File;
 base64textString:string | ArrayBuffer;
 fileExtension: string;
 isFileAttached:boolean;
 response:any;
 fileName: string;
 extractedUrl: string;
previewUrl:any = null;
  @Output() closeModalEvent = new EventEmitter();
  isShow: boolean;

  constructor(private _ticketService:TicketService, private domSanitizer: DomSanitizer,
    private router: Router, private formBuilder: FormBuilder, private dialog :MatDialog, private _dataSourceService: DataSourceService) {
    this.showForm = false;
    GlobalConstant.dataSource= new MatTableDataSource([]);
   }

  ngOnInit() {
 this.saveDialog(event);
  }

//   saveTicketInfo(event:any){
//     event.preventDefault();
//     this.showForm = true;

//     document.getElementById('id01').style.visibility="hidden";

//     let saveRequest: any = {
//       userId: "vamsi@altimetrik.com",
//       ticket: this.ticket,
//       description: this.description,
//       attached: this.isFileAttached,
//       type: this.type,
//       priority: this.priority,
//       fileBase64: this.base64textString,
//       fileExtension: this.fileExtension
//     };

//    this._ticketService.saveTicketInfo(saveRequest).subscribe(
//       data=>{
//         // console.log(data);
//         this.response=data;
//         if(data) {
//           GlobalConstant.dataSource.data.push(data);
//           GlobalConstant.dataSource.sort = GlobalConstant.dataSource.sort;
//           GlobalConstant.dataSource.paginator = GlobalConstant.dataSource.paginator;
//         }
//       },
//       (error)=>{
//         console.log(error.error.message);
//       }
//     );
//     this.ticket="";
//     this.type="Bug";
//     this.priority="Low";
//     this.description="";
//     this.isFileAttached=false;
//     if(this.showForm){
//       return this.router.navigateByUrl('/ticket-list');
//     }

//   }
//   changeListener($event) : void {
// console.log("changeListener triggered ")
//     this.readThis($event.target);
//   }

//   readThis(inputValue: any): void {
//     var file:File = inputValue.files[0];
//     var myReader:FileReader = new FileReader();
//     console.log("our file is attached "+this.fileName);

//     myReader.onloadend = (e) => {
//       // console.log("this.image="+myReader.result);
//       // let bufferImg: string | ArrayBuffer;


//       this.base64textString = myReader.result;
//       this.fileExtension = this.fileName.split(".")[1];
//       console.log("file extension updated "+this.fileExtension);
//       if(this.base64textString){
//           this.isFileAttached=true;
//           // console.log(this.base64textString);
//       }
//     }
//     myReader.readAsDataURL(file);
//   }

// displayPop(event:any)
// {
//   document.getElementById('id01').style.display='block';
//   document.getElementById('id01').style.visibility='';
//   this.showForm = false;
// }
saveDialog(event:any)
{
  const dialogConfig =new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="80%";
  GlobalConstant.findById = null;
  this.dialog.open(SaveTicketDialogComponent,dialogConfig);
}

}
