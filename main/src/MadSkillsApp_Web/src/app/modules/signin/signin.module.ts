import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutingConstants } from './../../misc/app.routes.constants';
// Auth Guard

import { PublicLayoutComponent } from './../../components/layouts/public/layout.public.component'
import { SigninComponent } from "./components/signin.component";
//import { AuthenticationService } from "./services/signin.service";

//TODO exportar el login y registro
@NgModule({
  declarations: [SigninComponent],
  exports: [SigninComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      {
        path: RoutingConstants._SIGNIN, component: PublicLayoutComponent,
        children: [{ path: '', component: SigninComponent }]
      }
    ])

  ],
  providers: []
})

export class SigninModule { }
