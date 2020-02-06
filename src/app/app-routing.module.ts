import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { componentFactoryName } from '@angular/compiler';
import { TicketGenerationComponent } from './ticket-generation/ticket-generation.component';
import { DataTableComponent } from './data-table/data-table.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
   { path: 'ticket-generation', component: TicketGenerationComponent  },
   { path: 'data-table', component: DataTableComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }