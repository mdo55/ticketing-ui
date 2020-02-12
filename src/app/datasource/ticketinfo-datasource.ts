import { MatTableDataSource } from '@angular/material';
import { TicketResponse } from '../dto/ticket-response';

export class TicketInfoDataSource extends MatTableDataSource<TicketResponse> {
 
    constructor(){
        super();
    }  

}