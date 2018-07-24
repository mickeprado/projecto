import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";


import { RoutingConstants } from './misc/app.routes.constants';
import { AuthGuard } from './services/auth.guard';
import { AwsService } from './services/aws.service';
import { AuthenticationService } from './services/authentication.service';




// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppComponent,
        AwsService,
        AuthenticationService,
        AuthGuard,
        RouterModule.forRoot([
            { path: '', redirectTo: RoutingConstants._SIGNIN, pathMatch: 'full' },
            { path: '**', redirectTo: RoutingConstants._SIGNIN }
          ])
    ],
    exports: [RouterModule],
    providers: [
        AuthGuard, AwsService, AuthenticationService
    ],
    schemas: [
       
    ]
})
export class AppModule { }
