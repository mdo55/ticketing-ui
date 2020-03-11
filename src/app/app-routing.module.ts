import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { componentFactoryName } from '@angular/compiler';
import { SaveTicketComponent } from './ticket-info/save-ticket/save-ticket.component';
import { TicketListComponent } from './ticket-info/ticket-list/ticket-list.component';
import { SaveTicketDialogComponent } from './dialog/save-ticket-dialog/save-ticket-dialog.component';
import { RedirectUrlComponent } from './redirect-url/redirect-url.component';
import { TicketInfoDialogComponent } from './dialog/ticket-info-dialog/ticket-info-dialog.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login' , component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
   { path: 'save-ticket', component: SaveTicketComponent  },
   { path: 'ticket-list', component: TicketListComponent  },
   { path: 'save-ticket-dialog', component: SaveTicketDialogComponent },
   { path: 'ticket-info-dialog', component: TicketInfoDialogComponent },
   { path: 'redirect-url', component: RedirectUrlComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
