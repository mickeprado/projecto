import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { PublicLayoutComponent } from "./public/layout.public.component";
import { AuthenticatedLayoutComponent } from "./authenticated/layout.authenticated.component";

import { FooterComponent } from './../footer/footer.component';
import { HeaderComponent } from './../header/header.component';
import { MainMenuComponent } from './../mainmenu/mainmenu.component';
import { NotificationsComponent } from './../notifications/notifications.component';

@NgModule({
  declarations: [
    AuthenticatedLayoutComponent, PublicLayoutComponent, FooterComponent, HeaderComponent, MainMenuComponent, NotificationsComponent
  ],
  exports: [
    AuthenticatedLayoutComponent, PublicLayoutComponent, FooterComponent, HeaderComponent, MainMenuComponent,  NotificationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule    
  ],
  providers: [

  ]
})

export class LayoutsModule { }
