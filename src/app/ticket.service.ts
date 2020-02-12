import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseUrl:string="http://localhost:8088/ticketsysmgmt/";
  private saveTicket: string = this.baseUrl+ 'saveTicket';
  private loadPage: string = this.baseUrl + 'loadPage';
  private _findById : string = this.baseUrl + 'findBy/';
  private _updateTicket : string = this.baseUrl + 'updateTicket';
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
  saveTicketInfo(data): Observable<any> {
    return this._http.post(this.saveTicket, data, {headers: this.headers});
  }

  findById(ticketId): Observable<any> {
    return this._http.get(this._findById+ticketId)
  } 

  updateTicket(data): Observable<any> {
    return this._http.put(this._updateTicket,data,{headers: this.headers} );
  }
}
   
