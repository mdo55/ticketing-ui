import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  err = new Subject<string>();

  private baseUrl:string="http://localhost:8088/ticketsysmgmt/";
  private saveTicket: string = this.baseUrl+ 'saveTicket';
  private loadPage: string = this.baseUrl + 'loadPage';
  private _findById : string = this.baseUrl + 'findBy/';
  private _updateTicket : string = this.baseUrl + 'updateTicket';
  private _ticketCount : string = this.baseUrl+ 'getTicketsCount';
  // 'getTicketsCount';
  headers: HttpHeaders;
  constructor(private _http:HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.set('Access-Control-Allow-Origin',"*");

  }

  getTicket(data): Observable<any>{

    return this._http.post(this.baseUrl,data);
  }

  getPage(): Observable<any> {
    return this._http.get(this.loadPage);
  }
  getCount(): Observable<any>{
    return this._http.get(this._ticketCount);
  }
  saveTicketInfo(data): Observable<any> {
    return this._http.post(this.saveTicket, data, {headers: this.headers});
  }

  findById(ticketId): Observable<any> {
    return this._http.get(this._findById+ticketId)
  }

  updateTicket(data): Observable<any> {
    return this._http.put(this._updateTicket,data,{headers: this.headers} );
    // .subscribe(Response=>{
    //   console.log(Response)
    // },
    // err =>{
    //  this.err.next(data.message);
    // });
  }
//   private handleError(errorResponse: HttpErrorResponse) {
//     if (errorResponse.error instanceof ErrorEvent) {
//         console.error('Client Side Error :', errorResponse.error.message);
//     } else {
//         console.error('Server Side Error :', errorResponse);
//     }
//     // return an observable with a meaningful error message to the end user
//     return new ErrorObservable("cdscsdsscs");
// }

}

