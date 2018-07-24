import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutingConstants } from './../../misc/app.routes.constants';
// Auth Guard

import { PublicLayoutComponent } from './../../components/layouts/public/layout.public.component'
import { ForgotMainComponent } from './main/forgotpwd.main.component';
import { ForgotCodeComponent } from './code/forgotpwd.code.component';
import { ForgotNewPwdComponent } from './newpassword/forgotpwd.newpwd.component';


@NgModule({
  declarations: [ForgotMainComponent, ForgotCodeComponent, ForgotNewPwdComponent],
  exports: [ForgotMainComponent, ForgotCodeComponent, ForgotNewPwdComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      {
        path: RoutingConstants._FORGOTPWD, component: PublicLayoutComponent,
        children: [{ path: '', component: ForgotMainComponent }]
      },
      {
        path: RoutingConstants._FORGOTPWDCODE, component: PublicLayoutComponent,
        children: [{ path: '', component: ForgotCodeComponent }]
      },
      {
        path: RoutingConstants._FORGOTPWDCHANGE, component: PublicLayoutComponent,
        children: [{ path: '', component: ForgotNewPwdComponent }]
      }
    ])

  ],
  providers: []
})

export class ForgotPasswordModule { }
