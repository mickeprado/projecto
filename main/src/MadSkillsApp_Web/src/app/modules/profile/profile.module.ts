import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutingConstants } from './../../misc/app.routes.constants';
// Auth Guard

import { AuthenticatedLayoutComponent } from './../../components/layouts/authenticated/layout.authenticated.component'
import { ProfileComponent } from './components/profile.component';


//TODO exportar el login y registro
@NgModule({
  declarations: [ProfileComponent ],
  exports: [ProfileComponent],
  imports: [
    FormsModule,
    CommonModule,    
    RouterModule.forRoot([
      {
        path: RoutingConstants._PROFILE, component: AuthenticatedLayoutComponent,
        //canActivate: [AuthGuard],
        children: [{ path: '', component: ProfileComponent }]
      }      
    ])

  ],
  providers: []
})

export class ProfileModule { }
