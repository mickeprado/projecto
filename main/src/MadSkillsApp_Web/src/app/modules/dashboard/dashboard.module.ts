import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutingConstants } from './../../misc/app.routes.constants';
// Auth Guard
import { AuthGuard } from './../../services/auth.guard'
import { AuthenticatedLayoutComponent } from './../../components/layouts/authenticated/layout.authenticated.component'
import { DashboardComponent } from './component/dashboard.component';



@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      {
        path: RoutingConstants._DASHBOARD, component: AuthenticatedLayoutComponent,
        //canActivate: [AuthGuard],
        children: [{ path: '', component: DashboardComponent }]
      }
    ])

  ],
  providers: []
})

export class DashboardModule { }
