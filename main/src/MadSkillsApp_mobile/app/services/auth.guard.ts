import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RoutingConstants } from './../misc/app.routes.constants';
import { SessionConstants } from './../misc/app.systen.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(SessionConstants._USER)) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate([RoutingConstants._SIGNIN], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
