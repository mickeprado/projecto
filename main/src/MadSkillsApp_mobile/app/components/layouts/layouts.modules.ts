import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { PublicLayoutComponent } from "./public/public.component";
import { PrivateLayoutComponent } from "./private/private.component";



@NgModule({
  declarations: [
    PublicLayoutComponent, PrivateLayoutComponent
  ],
  exports: [
    PublicLayoutComponent, PrivateLayoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule    
  ],
  providers: [
  ]
})

export class LayoutsModule { }