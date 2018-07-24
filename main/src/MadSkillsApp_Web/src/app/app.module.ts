import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutingConstants } from './misc/app.routes.constants';
import { HttpModule } from '@angular/http';
//import { FloatingActionMenuModule } from 'ngx-floating-action-menu';

import { AwsService } from './services/aws.service';
import { AuthenticationService } from './services/authentication.service';

import { AppComponent } from './app.component';

import { AuthGuard } from './services/auth.guard';
import { LayoutsModule } from './components/layouts/layouts.modules'
import { SigninModule } from './modules/signin/signin.module';
import { SignupModule } from './modules/signup/signup.module';
import { ForgotPasswordModule } from './modules/forgotpwd/forgotpwd.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FamilyGroupModule } from './modules/familygroup/familygroup.module';
import { ProfileModule } from './modules/profile/profile.module';


@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    LayoutsModule,
    SigninModule,
    SignupModule,
    DashboardModule,
    ForgotPasswordModule,
    FamilyGroupModule,
    ProfileModule,
    //FloatingActionMenuModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: RoutingConstants._SIGNIN, pathMatch: 'full' },
      { path: '**', redirectTo: RoutingConstants._SIGNIN }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AwsService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
