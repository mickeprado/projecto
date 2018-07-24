import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutingConstants } from './../../misc/app.routes.constants';
// Auth Guard

import { PublicLayoutComponent } from './../../components/layouts/public/layout.public.component'
import { SignupMainComponent } from "./main/signup.main.component";
import { SignupVEComponent } from "./validemail/signup.validemail.component";
import { SignupdisclosureComponent } from "./disclosure/signup.disclosure.component";
import { SignupProfileComponent } from "./signupprofile/signup.profile.component";


//TODO exportar el login y registro
@NgModule({
  declarations: [SignupMainComponent, SignupVEComponent, SignupdisclosureComponent, SignupProfileComponent],
  exports: [SignupMainComponent, SignupVEComponent, SignupdisclosureComponent, SignupProfileComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      {
        path: RoutingConstants._SIGNUPMAIN, component: PublicLayoutComponent,
        children: [{ path: '', component: SignupMainComponent }]
      },
      {
        path: RoutingConstants._SIGNUPCODE, component: PublicLayoutComponent,
        children: [{ path: '', component: SignupVEComponent }]
      },
      {
        path: RoutingConstants._SIGNUPDISCLOSURE, component: PublicLayoutComponent,
        children: [{ path: '', component: SignupdisclosureComponent }]
      },
      {
        path: RoutingConstants._SIGNUPPROFILE, component: PublicLayoutComponent,
        children: [{ path: '', component: SignupProfileComponent }]
      }
    ])

  ],
  providers: []
})

export class SignupModule { }
