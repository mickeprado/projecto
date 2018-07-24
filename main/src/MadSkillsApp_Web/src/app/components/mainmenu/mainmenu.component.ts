import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RoutingConstants } from './../../misc/app.routes.constants';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'auth-menu',
  templateUrl: './mainmenu.component.html'
})
export class MainMenuComponent implements OnInit {
  urlSession: string;
  urlFamilyGroup: string;
  urlPerformance: string;
  urlActivities: string;

  constructor(private router : Router, private authService : AuthenticationService){}
  ngOnInit() {
    this.urlSession = "/"+RoutingConstants._SESSIONS;
    this.urlFamilyGroup = "/"+RoutingConstants._FAMILYGROUP;
    this.urlPerformance = "/"+RoutingConstants._PERFORMANCE;
    this.urlActivities = "/"+RoutingConstants._ACTIVITIES;
  }

  
    activeRoute(routename: string): boolean {
      return this.router.url.indexOf(routename) > -1;
    }

    isParent(): boolean{
      //Check the current user role. methof from authentication service
      
      // if the User has the PARENT role, then it pass
      return true;
    }
}
