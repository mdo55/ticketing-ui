import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/ticket.service';
import { DataSourceService } from 'src/app/service/DataSourceService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alertdialog',
  templateUrl: './alertdialog.component.html',
  styleUrls: ['./alertdialog.component.css']
})
export class AlertdialogComponent implements OnInit {
  str: any;
  myArray : any =[];
  dialogRef: any;

  constructor(private _ticketService:TicketService, public matDialogRef: MatDialogRef<AlertdialogComponent>,
    private dialog :MatDialog, private _dataSourceService: DataSourceService) {  }

  ngOnInit() {
    // console.log('---------------------> '+MAT_DIALOG_DATA.toString);
    // console.log('---------------------> '+this.matDialogRef._containerInstance._config.data.message);
 this.splitstr(this.str);
  }


   splitstr(str){
    
 var str = this.matDialogRef._containerInstance._config.data.message;
 this.myArray = str.split(",");
 
 for(let index=0;index<this.myArray.length;index++){
  console.log(this.myArray[index]);
  return this.myArray .reverse();
 }
 
  
}
onSubmits(event){

this.matDialogRef.close();
}
}

