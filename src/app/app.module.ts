import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TicketService } from './ticket.service';
import {MatIconModule} from '@angular/material/icon';
import { IconImportModule } from 'mat-icon-import';
import { MatDialog, MatDialogModule ,MatDialogConfig } from '@angular/material';
import { TicketInfoDialogComponent } from './dialog/ticket-info-dialog/ticket-info-dialog.component';
import { TicketListComponent } from './ticket-info/ticket-list/ticket-list.component';
import { SaveTicketComponent } from './ticket-info/save-ticket/save-ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    TicketInfoDialogComponent,
    TicketListComponent,
    SaveTicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    IconImportModule,
    MatDialogModule,
  
  ],
  providers: [
    TicketService
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[TicketInfoDialogComponent]
})
export class AppModule { }



