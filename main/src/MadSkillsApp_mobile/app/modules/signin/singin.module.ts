import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { RoutingConstants } from './../../misc/app.routes.constants';

import { PublicLayoutComponent } from './../../components/layouts/public/public.component'
import { SigninComponent } from "./components/signin.component";
//import { AuthenticationService } from "./services/signin.service";

//TODO exportar el login y registro
@NgModule({
  declarations: [SigninComponent],
  exports: [SigninComponent],
  imports: [
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
